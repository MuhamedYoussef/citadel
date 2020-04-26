from django.urls import path
from django.views.generic import TemplateView

from .views import *

urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html')),
    path('list', PropertyListView.as_view(), name='property_list'),
    path('map', PropertyMapListView.as_view(), name='property_map'),
    path('property', PropertyList.as_view(), name='property'),
    path('feature_property', FeatureProprty.as_view(), name='feature_property')
]
