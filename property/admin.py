from django.contrib import admin
from django.contrib.gis.admin import OSMGeoAdmin

from .models import Property, POI



@admin.register(Property)
class PropertyAdmin(OSMGeoAdmin):
    list_display = ('price', 'location')

@admin.register(POI)
class PropertyAdmin(OSMGeoAdmin):
    list_display = ('title', 'location')