# Generated by Django 5.1.7 on 2025-03-12 09:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('delivery', '0003_alter_order_scheduled_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='assignment',
            name='status',
            field=models.CharField(choices=[('success', 'success'), ('failed', 'failed')], max_length=7),
        ),
    ]
