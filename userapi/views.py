from django.shortcuts import render
from .serializers import UserSerializer
from rest_framework import generics, permissions
from django.contrib.auth.models import User

# Create your views here.


class UserAPIView(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

class UserList(generics.ListAPIView):
  queryset = User.objects.all()
  serializer_class = UserSerializer