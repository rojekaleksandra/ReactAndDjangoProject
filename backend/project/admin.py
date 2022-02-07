from django.contrib import admin
from .models import *

class ClientAdmin(admin.ModelAdmin):
    list_display = ('lastname', 'name', 'tel', 'email')

class ObjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'city', 'zip_code', 'street_house_numb', 'tel', 'email', 'web_www', 'check_in', 'check_out', 'percent_advance_payment', 'numb_of_days_advance_payment')

class AccommodationAdmin(admin.ModelAdmin):
    list_display = ('object', 'name', 'price_for_day', 'numb_rooms', 'numb_people', 'double_bed', 'single_bed')

class ReservationAdmin(admin.ModelAdmin):
    list_display = ('client', 'object', 'accommodation', 'arrival_date', 'departure_date', 'payment_status', 'add_info')

admin.site.register(Object, ObjectAdmin)
admin.site.register(Accommodation, AccommodationAdmin)
admin.site.register(Reservation, ReservationAdmin)
admin.site.register(Client, ClientAdmin)
