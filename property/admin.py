from django.contrib import admin
from django.contrib.gis.admin import OSMGeoAdmin

from .models import Property



@admin.register(Property)
class PropertyAdmin(OSMGeoAdmin):
    list_display = ('price', 'location')