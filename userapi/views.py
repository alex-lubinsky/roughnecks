from django.shortcuts import render
from .serializers import UserSerializer
from rest_framework import generics, permissions
from rest_framework.views import APIView
from django.contrib.auth.models import User
from .models import UserProfile
from .serializers import UserProfileSerializer, UserSerializer
from rest_framework.response import Response
# Create your views here.


class UserAPIView(APIView):
  permission_classes = [
      permissions.IsAuthenticated,
  ]

  def get(self, request):
    pk=self.request.user.id
    user = User.objects.all().get(id=pk)
    user_serializer = UserSerializer(user)
    up = UserProfile.objects.all().get(user=pk)
    up_serializer = UserProfileSerializer(up)
    return Response({**user_serializer.data, 'isSkymallAdmin': up_serializer.data['isSkymallAdmin']})

class UserList(generics.ListAPIView):
  queryset = User.objects.all()
  serializer_class = UserSerializer

class UserProfileView(generics.RetrieveAPIView):
  queryset = UserProfile.objects.all()
  serializer_class = UserProfileSerializer

class UserProfileList(generics.ListAPIView):
  queryset = UserProfile.objects.all()
  serializer_class = UserProfileSerializer