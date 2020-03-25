from django.urls import path
from .views import *

urlpatterns = [
    path('', PropertyListView.as_view(), name='property_list'),
    path('map', PropertyMapListView.as_view(), name='property_map'),
    path('property', PropertyList.as_view(), name='property')
]