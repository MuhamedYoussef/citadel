# from django.db import models
from django.contrib.gis.db import models


class Property(models.Model):
    # owner = models.ForeignKey()
    price = models.IntegerField()
    location = models.PointField()
    address = models.TextField()