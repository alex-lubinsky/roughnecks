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

class CharacterRaceList(generics.ListCreateAPIView):
  queryset = CharacterRace.objects.all()
  serializer_class = CharacterRaceSerializer

class CharacterRaceDetail(generics.RetrieveUpdateDestroyAPIView):
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