from rest_framework import serializers
from .models import *

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id', 
            'name',
            'lastname',
            'tel',
            'email',
        )
        model = Client

class ObjectSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id', 
            'name',
            'city',
            'zip_code',
            'street_house_numb',
            'tel',
            'email',
            'web_www',
            'check_in',
            'check_out',
            'percent_advance_payment',
            'numb_of_days_advance_payment',
        )
        model = Object

class AccommodationSerializer(serializers.ModelSerializer):
    object = serializers.SlugRelatedField(slug_field="name", queryset=Object.objects.all())
    class Meta:
        fields = (
            'id', 
            'object',
            'name',
            'price_for_day',
            'numb_rooms',
            'numb_people',
            'double_bed',
            'single_bed',
        )
        model = Accommodation 


class ReservationSerializer(serializers.ModelSerializer):
    object = serializers.SlugRelatedField(slug_field="name", queryset=Object.objects.all())
    accommodation = serializers.SlugRelatedField(slug_field="name", queryset=Accommodation.objects.all())
    class Meta:
        fields = (
            'id',
            'client',
            'object',
            'accommodation',
            'arrival_date',
            'departure_date',
            'payment_status',
            'add_info',
        )
        model = Reservation


