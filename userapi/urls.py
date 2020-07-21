from django.urls import path, include
from .views import *

urlpatterns = [
    path('user/', UserAPIView.as_view()),
    path('users/', UserList.as_view()),
    path('userprofile/', UserProfileView.as_view()),
    path('userprofiles/', UserProfileList.as_view()),
]
