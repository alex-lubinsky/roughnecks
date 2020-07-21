from django.contrib import admin
from .models import *

# Register your models here.

class UserProfileAdmin(admin.ModelAdmin):
  list_display = ('id', 'user', 'isSkymallAdmin')

admin.site.register(UserProfile, UserProfileAdmin)
