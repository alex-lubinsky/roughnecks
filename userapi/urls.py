from .views import UserAPIView, UserList
from django.urls import path, include

urlpatterns = [
    path('user', UserAPIView.as_view()),
    path('users', UserList.as_view()),
]
