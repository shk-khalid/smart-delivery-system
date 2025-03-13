from rest_framework import serializers
from .models import DeliveryPartner, Order, Assignment, AssignmentMetrics

class DeliveryPartnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeliveryPartner
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'


class AssignmentSerializer(serializers.ModelSerializer):
    # These read-only fields come from @property methods in your model
    orderId = serializers.ReadOnlyField()
    partnerId = serializers.ReadOnlyField()
    orderDetails = serializers.ReadOnlyField()
    partnerDetails = serializers.ReadOnlyField()

    class Meta:
        model = Assignment
        # Instead of '__all__', explicitly list only the fields you want in the JSON:
        fields = [
            'id',
            'timestamp',
            'status',
            'reason',
            'orderId',
            'partnerId',
            'orderDetails',
            'partnerDetails',
        ]

class AssignmentMetricsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssignmentMetrics
        fields = '__all__'

class AssignmentMetricsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssignmentMetrics
        fields = '__all__'
