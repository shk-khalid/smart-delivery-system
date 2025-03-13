from django.db import models
from django.contrib.postgres.fields import ArrayField

class DeliveryPartner(models.Model):
    STATUS_CHOICES = [('active', 'Active'), ('inactive', 'Inactive')]

    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True, max_length=100)
    phone = models.CharField(max_length=15)
    status = models.CharField(max_length=8, choices=STATUS_CHOICES)
    current_load = models.IntegerField(default=0)  # max: 3
    areas = models.JSONField(blank=True, null=True)  # List of strings

    # Store shift times as separate char fields; expose them via a property.
    shift_start = models.CharField(max_length=5)
    shift_end = models.CharField(max_length=5)

    # Metrics fields with renamed keys to match frontend
    rating = models.FloatField(default=0)
    completed_orders = models.IntegerField(default=0)
    cancelled_orders = models.IntegerField(default=0)

    def __str__(self):
        return self.name

    @property
    def shift(self):
        return {
            'start': self.shift_start,
            'end': self.shift_end
        }


class Order(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('assigned', 'Assigned'),
        ('picked', 'Picked'),
        ('delivered', 'Delivered'),
    ]

    order_number = models.CharField(max_length=50, unique=True)
    customer_name = models.CharField(max_length=100)
    customer_phone = models.CharField(max_length=15)
    delivery_area = models.CharField(max_length=100)
    items = models.JSONField()  # List of objects with name, quantity, price
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    scheduled_time = models.DateTimeField(null=True, blank=True)  
    assigned_to = models.ForeignKey(DeliveryPartner, null=True, blank=True, on_delete=models.SET_NULL)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)
    # Position field as an array of two numbers (latitude, longitude)
    position = ArrayField(
        base_field=models.FloatField(),
        size=2,
        blank=True,
        null=True,
        help_text="GPS coordinates as [latitude, longitude]"
    )

    def __str__(self):
        return self.order_number
    

class Assignment(models.Model):
    STATUS_CHOICES = [
        ('success', 'success'),
        ('failed', 'failed'),
    ]

    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    partner = models.ForeignKey(DeliveryPartner, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=7, choices=STATUS_CHOICES)
    reason = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return f"Assignment: {self.order.order_number} -> {self.partner.name}"

    @property
    def orderId(self) -> str:
        return self.order.order_number

    @property
    def partnerId(self) -> str:
        return str(self.partner.id)

    @property
    def orderDetails(self) -> dict:
        item_names = [item['name'] for item in self.order.items if 'name' in item]

        return {
            'items': item_names,
            'total': float(self.order.total_amount),
            'destination': self.order.delivery_area,
        }

    @property
    def partnerDetails(self) -> dict:
        return {
            'name': self.partner.name,
            'phone': self.partner.phone,
            'rating': self.partner.rating,
        } 

class AssignmentMetrics(models.Model):
    total_assigned = models.IntegerField(default=0)
    success_rate = models.FloatField(default=0)
    average_time = models.FloatField(default=0)
    failure_reasons = models.JSONField(default=list)  # List of objects: [{'reason': str, 'count': int}]
    historical_data = models.JSONField(default=list)  # List of snapshots: [{'timestamp': <datetime>, 'successRate': <float>, 'averageTime': <float>, 'totalAssigned': <int>}]

    def __str__(self):
        return "Assignment Metrics"
