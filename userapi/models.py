from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class UserProfile(models.Model):

  user = models.OneToOneField(User, on_delete=models.CASCADE, blank=True, null=True)
  isSkymallAdmin = models.BooleanField(default=False)