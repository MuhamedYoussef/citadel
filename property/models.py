# from django.db import models
from django.contrib.gis.db import models


class Property(models.Model):
    class Meta:
        verbose_name_plural = 'Properties'

    # owner = models.ForeignKey()
    price = models.IntegerField()
    location = models.PointField()
    address = models.TextField()



TYPES = [
    ('subway', 'Subway'),
    ('school', 'School'),
    ('hospital', 'Hospital'),
    ('pharmacy', 'Pharmacy'),
    ('restaurant', 'Restaurant'),
    ('parking', 'Parking'),
    ('mall', 'Mall'),
    ('cinema', 'Cinema'),
    ('bus', 'Bus Station'),
    ('shop', 'Shop'),
]


class POI(models.Model):
    class Meta:
        verbose_name = 'POI'
    
    type = models.CharField(max_length=50, choices=TYPES)
    title = models.CharField(max_length=100)
    location = models.PointField()

    # POI.objects.create(type='subway', title=feature['properties']['Name'], location=Point(list(feature['geometry']['coordinates'][:2])))