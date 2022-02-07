from django.shortcuts import render
from rest_framework import viewsets,generics
from .serializers import *
from .models import *

# Create your views here.

class ClientView(viewsets.ModelViewSet):
    serializer_class = ClientSerializer
    queryset = Client.objects.all()

class ObjectView(viewsets.ModelViewSet):
    serializer_class = ObjectSerializer
    queryset = Object.objects.all()

class AccommodationView(viewsets.ModelViewSet):
    serializer_class = AccommodationSerializer
    queryset = Accommodation.objects.all()

class ReservationView(viewsets.ModelViewSet):
    serializer_class = ReservationSerializer
    queryset = Reservation.objects.all()