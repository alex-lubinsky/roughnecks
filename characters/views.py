from django.shortcuts import render
from rest_framework import generics, permissions
from characters.models import *
from .serializers import *
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .permissions import IsCreatorOrReadOnly

# Create your views here.

class CharacterList(generics.ListCreateAPIView):
  queryset = Character.objects.all()
  serializer_class = CharacterSerializer

class CharacterDetail(generics.RetrieveUpdateDestroyAPIView):
  permission_classes = (IsCreatorOrReadOnly,)
  queryset = Character.objects.all()
  serializer_class = CharacterSerializer

class MissionList(generics.ListCreateAPIView):
  queryset = Mission.objects.all()
  serializer_class = MissionSerializer

class MissionDetail(generics.RetrieveUpdateDestroyAPIView):
  queryset = Mission.objects.all()
  serializer_class = MissionSerializer

class CharacterRaceList(generics.ListAPIView):
  queryset = CharacterRace.objects.all()
  serializer_class = CharacterRaceSerializer

class CharacterSubClassList(generics.ListAPIView):
  queryset = CharacterSubClass.objects.all()
  serializer_class = CharacterSubClassSerializer

class PlayerCharacterClassList(generics.ListCreateAPIView):
  queryset = PlayerCharacterClass.objects.all()
  serializer_class = PlayerCharacterClassSerializer

class PlayerCharacterClassDetail(generics.RetrieveUpdateDestroyAPIView):
  queryset = PlayerCharacterClass.objects.all()
  serializer_class = PlayerCharacterClassSerializer

class TransactionList(generics.ListCreateAPIView):
  queryset = Transaction.objects.all()
  serializer_class = TransactionSerializer

class DowntimeList(generics.ListCreateAPIView):
  queryset = Downtime.objects.all()
  serializer_class = DowntimeSerializer

class DowntimeDetail(generics.RetrieveUpdateDestroyAPIView):
  queryset = Downtime.objects.all()
  serializer_class = DowntimeSerializer

class ItemList(generics.ListCreateAPIView):
  queryset = Item.objects.all()
  serializer_class = ItemSerializer

class ItemDetail(generics.RetrieveUpdateDestroyAPIView):
  queryset = Item.objects.all()
  serializer_class = ItemSerializer

class ItemsOwnedList(generics.ListCreateAPIView):
  queryset = ItemsOwned.objects.all()
  serializer_class = ItemsOwnedSerializer

class ItemsOwnedDetail(generics.RetrieveUpdateDestroyAPIView):
  queryset = ItemsOwned.objects.all()
  serializer_class = ItemsOwnedSerializer

class DowntimeTypeList(generics.ListAPIView):
  queryset = DowntimeType.objects.all()
  serializer_class = DowntimeTypeSerializer

class DowntimeJobList(generics.ListAPIView):
  queryset = DowntimeJobs.objects.all()
  serializer_class = DowntimeJobsSerializer

class AirshipUpgradesList(generics.ListCreateAPIView):
  queryset = AirshipUpgrades.objects.all()
  serializer_class = AirshipUpgradeSerializer


import logging

from django.views.generic import View
from django.http import HttpResponse
from django.conf import settings
import os

class FrontendAppView(View):
    """
    Serves the compiled frontend entry point (only works if you have run `yarn
    run build`).
    """

    def get(self, request, **kwargs):
        try:
            with open(os.path.join(settings.REACT_APP_DIR, 'build', 'index.html')) as f:
                return HttpResponse(f.read())
        except FileNotFoundError:
            logging.exception('Production build of app not found')
            return HttpResponse(
                """
                This URL is only used when you have built the production
                version of the app. Visit http://localhost:3000/ instead, or
                run `yarn run build` to test the production version.
                """,
                status=501,
            )