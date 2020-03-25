from django.shortcuts import render
from django.views import generic
from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import PropertySerializer
from .models import Property



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

        from django.core.serializers import serialize

        properties = serialize('geojson', Property.objects.all(), geometry_field='location')



        return Response(properties)