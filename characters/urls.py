from django.urls import path
from .views import *

urlpatterns = [
  path('characters/<int:pk>/', CharacterDetail.as_view()),
  path('missions/<int:pk>/', MissionDetail.as_view()),
  path('missions/', MissionList.as_view()),
  path('characters/', CharacterList.as_view()),
  path('races/', CharacterRaceList.as_view()),
  path('subclasses/', CharacterSubClassList.as_view()),
  path('playercharacterclasses/', PlayerCharacterClassList.as_view()),
  path('transactions/', TransactionList.as_view()),
  path('downtime/', DowntimeList.as_view()),
  path('items/', ItemList.as_view()),
  path('items/<int:pk>/', ItemDetail.as_view()),
  path('itemsowned/<int:pk>/', ItemsOwnedDetail.as_view()),
  path('itemsowned/', ItemsOwnedList.as_view()),
  path('downtimetypes/', DowntimeTypeList.as_view()),
]