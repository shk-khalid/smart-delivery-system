# Generated by Django 5.1.7 on 2025-03-08 00:17

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AssignmentMetrics',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('total_assigned', models.IntegerField(default=0)),
                ('success_rate', models.FloatField(default=0)),
                ('average_time', models.FloatField(default=0)),
                ('failure_reasons', models.JSONField(default=list)),
            ],
        ),
        migrations.CreateModel(
            name='DeliveryPartner',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=100, unique=True)),
                ('phone', models.CharField(max_length=15)),
                ('status', models.CharField(choices=[('active', 'Active'), ('inactive', 'Inactive')], max_length=8)),
                ('current_load', models.IntegerField(default=0)),
                ('areas', models.JSONField(blank=True, null=True)),
                ('shift_start', models.CharField(max_length=5)),
                ('shift_end', models.CharField(max_length=5)),
                ('rating', models.FloatField(default=0)),
                ('completed_order', models.IntegerField(default=0)),
                ('cancelled_order', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order_number', models.CharField(max_length=50, unique=True)),
                ('customer_name', models.CharField(max_length=100)),
                ('customer_phone', models.CharField(max_length=15)),
                ('customer_address', models.CharField(max_length=255)),
                ('area', models.CharField(max_length=100)),
                ('items', models.JSONField()),
                ('status', models.CharField(choices=[('pending', 'Pending'), ('assigned', 'Assigned'), ('picked', 'Picked'), ('delivered', 'Delivered')], default='pending', max_length=10)),
                ('scheduled_for', models.CharField(max_length=5)),
                ('total_amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('assigned_to', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='delivery.deliverypartner')),
            ],
        ),
        migrations.CreateModel(
            name='Assignment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('status', models.CharField(choices=[('success', 'Success'), ('failed', 'Failed')], max_length=7)),
                ('reason', models.CharField(blank=True, max_length=255, null=True)),
                ('partner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='delivery.deliverypartner')),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='delivery.order')),
            ],
        ),
    ]
