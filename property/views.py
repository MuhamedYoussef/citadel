from django.shortcuts import render
from django.views import generic
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.serializers import serialize

from .serializers import PropertySerializer
from .models import Property, POI



class PropertyListView(generic.ListView):
    model = Property
    queryset = Property.objects.all()
    context_object_name = 'properties'
    template_name = 'property/list.html'


class PropertyMapListView(generic.ListView):
    model = Property
    queryset = Property.objects.all()
    context_object_name = 'properties'
    template_name = 'property/map.html'




class PropertyList(APIView):

    def get(self, request):
        # properties = PropertySerializer(Property.objects.all(), many=True)
        properties = serialize('geojson', Property.objects.all(), geometry_field='location')

        return Response(properties)



class FeatureProprty(APIView):

    def get(self, request):
        pk = request.GET.get('pk', None)
        radius = request.GET.get('radius', None)
        property = Property.objects.get(pk=pk)

        buffer_width = int(radius) / 40000000.0 * 360.0
        area = property.location.buffer(buffer_width)

        pois = POI.objects.filter(location__intersects=area)
        pois_json = serialize('geojson', pois, geometry_field='location')
        return Response(pois_json)