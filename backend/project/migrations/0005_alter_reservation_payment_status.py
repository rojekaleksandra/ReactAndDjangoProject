# Generated by Django 4.0 on 2021-12-10 11:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0004_alter_reservation_add_info'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reservation',
            name='payment_status',
            field=models.CharField(choices=[('Paid', 'Paid')], max_length=10),
        ),
    ]
