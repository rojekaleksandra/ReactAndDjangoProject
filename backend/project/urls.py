from django.urls import path
from . import views

urlpatterns = [
    path('client', views.ListClient.as_view()),
    path('client/<int:pk>/', views.DetailClient.as_view()),
    path('object', views.ListObject.as_view()),
    path('object/<int:pk>/', views.DetailObject.as_view()),
    path('accommodation', views.ListAccommodation.as_view()),
    path('accommodation/<int:pk>/', views.DetailAccommodation.as_view()),
    path('reservation', views.ListReservation.as_view()),
    path('reservation/<int:pk>/', views.DetailReservation.as_view()),
]