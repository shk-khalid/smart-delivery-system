from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action, api_view
from django.shortcuts import get_object_or_404
from django.db.models import Count, Sum
from django.db.models.functions import TruncDate
from datetime import timedelta
from .models import DeliveryPartner, Order, Assignment, AssignmentMetrics
from .serializers import (
    DeliveryPartnerSerializer,
    OrderSerializer,
    AssignmentSerializer,
    AssignmentMetricsSerializer,
)
import datetime

class DeliveryPartnerViewSet(viewsets.ModelViewSet):
    queryset = DeliveryPartner.objects.all()
    serializer_class = DeliveryPartnerSerializer


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    # GET /api/orders/ with optional filtering
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        status_filter = request.query_params.get('status')
        area_filter = request.query_params.get('area')
        date_filter = request.query_params.get('date')  # date in YYYY-MM-DD

        if status_filter:
            queryset = queryset.filter(status=status_filter)
        if area_filter:
            queryset = queryset.filter(area=area_filter)
        if date_filter:
            queryset = queryset.filter(created_at__date=date_filter)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    # POST /api/orders/assign: trigger assignment process for an order
    @action(detail=False, methods=['post'], url_path='assign')
    def assign_order(self, request):
        order_data = request.data
        order_id = order_data.get('order_id')
        if not order_id:
            return Response({'detail': 'Order ID is required.'}, status=status.HTTP_400_BAD_REQUEST)

        order = get_object_or_404(Order, id=order_id)

        if order.status != 'pending':
            return Response({'detail': 'Order is not pending and cannot be assigned.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Look for an active partner with load less than 3 and covering the order area
            partner = DeliveryPartner.objects.filter(
                status='active',
                current_load__lt=3,
                areas__contains=[order.delivery_area]
            ).first()
        except Exception as e:
            return Response({'detail': f'Error during partner lookup: {str(e)}'},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        if partner:
            try:
                order.status = 'assigned'
                order.assigned_to = partner
                order.save()

                partner.current_load += 1
                partner.save()

                assignment = Assignment.objects.create(
                    order=order,
                    partner=partner,
                    status='success'
                )
                serializer = AssignmentSerializer(assignment)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Exception as e:
                # If an error occurs during assignment, capture it and return failure response
                Assignment.objects.create(
                    order=order,
                    partner=partner,
                    status='failed',
                    reason=f'Error during assignment update: {str(e)}'
                )
                return Response({'detail': f'Assignment failed: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            assignment = Assignment.objects.create(
                order=order,
                partner=None,
                status='failed',
                reason='No available partner matching criteria (active, under load, correct area)'
            )
            serializer = AssignmentSerializer(assignment)
            return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

    # PUT /api/orders/[id]/status: update order status
    @action(detail=True, methods=['put'], url_path='status')
    def update_status(self, request, pk=None):
        order = self.get_object()
        new_status = request.data.get('status')
        if new_status not in dict(Order.STATUS_CHOICES).keys():
            return Response({'detail': 'Invalid status value.'}, status=status.HTTP_400_BAD_REQUEST)
        order.status = new_status
        order.save()

        serializer = self.get_serializer(order)
        return Response(serializer.data)

    # DELETE /api/orders/[id]: Delete a single order
    def destroy(self, request, pk=None):
        order = get_object_or_404(Order, id=pk)

        if order.status in ['assigned', 'picked', 'delivered']:
            return Response({'detail': 'Cannot delete an order that is already assigned or processed.'},
                            status=status.HTTP_400_BAD_REQUEST)

        order.delete()
        return Response({'detail': f'Order {pk} deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)

    # DELETE /api/orders/bulk_delete: Bulk delete orders
    @action(detail=False, methods=['delete'], url_path='bulk_delete')
    def bulk_delete(self, request):
        order_ids = request.data.get('order_ids', [])
        if not order_ids:
            return Response({'detail': 'No order IDs provided.'}, status=status.HTTP_400_BAD_REQUEST)

        orders = Order.objects.filter(id__in=order_ids, status='pending')

        if not orders.exists():
            return Response({'detail': 'No deletable orders found (only pending orders can be deleted).'},
                            status=status.HTTP_400_BAD_REQUEST)

        deleted_count, _ = orders.delete()
        return Response({'detail': f'{deleted_count} orders deleted successfully.'}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'], url_path='trends')
    def trends(self, request):
        start_date = request.query_params.get('start_date')
        end_date = request.query_params.get('end_date')
        if not (start_date and end_date):
            return Response(
                {'detail': 'start_date and end_date are required.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        try:
            start = datetime.datetime.strptime(start_date, '%Y-%m-%d').date()
            end = datetime.datetime.strptime(end_date, '%Y-%m-%d').date()
        except ValueError:
            return Response(
                {'detail': 'Invalid date format. Use YYYY-MM-DD.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # 1) Query aggregated data using scheduled_time instead of created_at
        aggregated = (
            self.queryset
            .filter(scheduled_time__date__gte=start, scheduled_time__date__lte=end)
            .annotate(date=TruncDate('scheduled_time'))
            .values('date')
            .annotate(
                orders=Count('id'),
                revenue=Sum('total_amount')
            )
            .order_by('date')
        )

        # Convert aggregated to a dict keyed by date for quick lookup
        aggregated_dict = {
            item['date']: {
                'orders': item['orders'],
                'revenue': item['revenue'] or 0
            }
            for item in aggregated
        }

        # 2) Build a day-by-day list from start to end
        trends_data = []
        current = start
        while current <= end:
            if current in aggregated_dict:
                trends_data.append({
                    'date': current.strftime('%Y-%m-%d'),
                    'orders': aggregated_dict[current]['orders'],
                    'revenue': aggregated_dict[current]['revenue'],
                })
            else:
                # No orders for this date, so 0
                trends_data.append({
                    'date': current.strftime('%Y-%m-%d'),
                    'orders': 0,
                    'revenue': 0,
                })
            current += timedelta(days=1)

        return Response(trends_data, status=status.HTTP_200_OK)


class AssignmentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Assignment.objects.all()
    serializer_class = AssignmentSerializer


@api_view(['GET'])
def assignment_metrics(request):
    metrics = AssignmentMetrics.objects.order_by('-id').first()
    if not metrics:
        return Response({"detail": "Metrics not available."}, status=status.HTTP_404_NOT_FOUND)
    serializer = AssignmentMetricsSerializer(metrics)
    return Response(serializer.data, status=status.HTTP_200_OK)



@api_view(['POST'])
def run_assignment_algorithm(request):
    # Track how many orders get assigned successfully
    assigned_count = 0
    # Track reasons for failures
    failure_reasons_run = {}
    # Collect per-order assignment times (in seconds)
    assignment_times = []

    # Fetch pending orders
    pending_orders = Order.objects.filter(status='pending')

    # Process each pending order
    for order in pending_orders:
        try:
            partner = DeliveryPartner.objects.filter(
                status='active',
                current_load__lt=3,
                areas__contains=[order.delivery_area]
            ).first()
        except Exception as e:
            reason = f'Error during partner lookup: {str(e)}'
            Assignment.objects.create(
                order=order,
                partner=None,
                status='failed',
                reason=reason,
            )
            failure_reasons_run[reason] = failure_reasons_run.get(reason, 0) + 1
            continue

        if partner:
            try:
                order.status = 'assigned'
                order.assigned_to = partner
                order.save()  # Presumably updates order.last_updated to now

                partner.current_load += 1
                partner.save()

                Assignment.objects.create(
                    order=order,
                    partner=partner,
                    status='success'
                )
                assigned_count += 1

                # Calculate how long this order took from created_at to last_updated
                time_diff = (order.last_updated - order.created_at).total_seconds()
                assignment_times.append(time_diff)

            except Exception as e:
                reason = f'Error during assignment update: {str(e)}'
                Assignment.objects.create(
                    order=order,
                    partner=partner,
                    status='failed',
                    reason=reason,
                )
                failure_reasons_run[reason] = failure_reasons_run.get(reason, 0) + 1
        else:
            reason = 'No available partner matching criteria (active, under load, correct area)'
            Assignment.objects.create(
                order=order,
                partner=None,
                status='failed',
                reason=reason,
            )
            failure_reasons_run[reason] = failure_reasons_run.get(reason, 0) + 1

    # Calculate the average time from creation to assignment (in seconds)
    if assigned_count > 0:
        average_time = sum(assignment_times) / assigned_count
    else:
        average_time = 0

    # Compute success rate
    total_pending = pending_orders.count()
    success_rate = (assigned_count / total_pending * 100) if total_pending > 0 else 0

    # Retrieve the most recent metrics record to build historical data and merge failure reasons
    last_metrics = AssignmentMetrics.objects.order_by('-id').first()

    # Build historical_data for the new record
    historical_data = []
    if last_metrics:
        historical_data = last_metrics.historical_data or []
        historical_data.append({
            "timestamp": last_metrics.created_at.isoformat()
                if hasattr(last_metrics, 'created_at')
                else datetime.datetime.now(datetime.timezone.utc).isoformat(),
            "average_time": last_metrics.average_time,
            "success_rate": last_metrics.success_rate,
            "total_assigned": last_metrics.total_assigned,
        })

    # Merge current run failure reasons with existing ones
    existing_failure = {}
    if last_metrics and last_metrics.failure_reasons:
        for entry in last_metrics.failure_reasons:
            existing_failure[entry["reason"]] = entry["count"]

    for reason, count in failure_reasons_run.items():
        existing_failure[reason] = existing_failure.get(reason, 0) + count

    merged_failure_reasons = [
        {"reason": k, "count": v} for k, v in existing_failure.items()
    ]

    # Create a new metrics record
    new_metrics = AssignmentMetrics.objects.create(
        total_assigned=assigned_count,
        success_rate=success_rate,
        average_time=average_time,  # Now based on per-order assignment times
        failure_reasons=merged_failure_reasons,
        historical_data=historical_data
    )

    serializer = AssignmentMetricsSerializer(new_metrics)
    return Response(serializer.data, status=status.HTTP_200_OK)
