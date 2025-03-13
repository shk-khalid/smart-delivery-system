# Generated by Django 5.1.7 on 2025-03-10 23:51

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('delivery', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='deliverypartner',
            old_name='cancelled_order',
            new_name='cancelled_orders',
        ),
        migrations.RenameField(
            model_name='deliverypartner',
            old_name='completed_order',
            new_name='completed_orders',
        ),
        migrations.RenameField(
            model_name='order',
            old_name='area',
            new_name='delivery_area',
        ),
        migrations.RenameField(
            model_name='order',
            old_name='updated_at',
            new_name='last_updated',
        ),
        migrations.RenameField(
            model_name='order',
            old_name='scheduled_for',
            new_name='scheduled_time',
        ),
        migrations.RemoveField(
            model_name='order',
            name='customer_address',
        ),
        migrations.AddField(
            model_name='assignmentmetrics',
            name='historical_data',
            field=models.JSONField(default=list),
        ),
        migrations.AddField(
            model_name='order',
            name='position',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.FloatField(), blank=True, help_text='GPS coordinates as [latitude, longitude]', null=True, size=2),
        ),
    ]
