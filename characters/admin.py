from django.contrib import admin
from .models import *

# Register your models here.

class CharacterAdmin(admin.ModelAdmin):
  list_display = ('id', 'firstName', 'lastName', 'dateCreated', 'creator', 'dead')

admin.site.register(Character, CharacterAdmin)

class MissionAdmin(admin.ModelAdmin):
  list_display = ('id', 'name', 'visable', 'episode', 'levelMin', 'levelMax')

admin.site.register(Mission, MissionAdmin)

class CharacterRaceAdmin(admin.ModelAdmin):
  list_display = ('id', 'raceName')

admin.site.register(CharacterRace, CharacterRaceAdmin)

class PlayerCharacterClassAdmin(admin.ModelAdmin):
  list_display = ('id', 'classCharacter', 'playerClass', 'levelNumber', 'dateCreated')

admin.site.register(PlayerCharacterClass, PlayerCharacterClassAdmin)

class CharacterSubClassAdmin(admin.ModelAdmin):
  list_display = ('subclassName', 'className', 'id')

admin.site.register(CharacterSubClass, CharacterSubClassAdmin)

class TransactionAdmin(admin.ModelAdmin):
  list_display = ('id', 'name', 'goldPcs', 'silverPcs', 'copperPcs', 'mission', 'airshipPot', 'earnedSpent')

admin.site.register(Transaction, TransactionAdmin)

class DowntimeAdmin(admin.ModelAdmin):
  list_display = ('id', 'description', 'downtimeType', 'numOfDaysSpent', 'character')

admin.site.register(Downtime, DowntimeAdmin)

class ItemAdmin(admin.ModelAdmin):
  list_display = ('id', 'name', 'costGold', 'costSilver', 'costCopper', 'description', 'numberInSkymall', 'allPcsCanPurchase', 'downtimeCost')

admin.site.register(Item, ItemAdmin)

class ItemsOwnedAdmin(admin.ModelAdmin):
  list_display = ('id', 'item', 'character')

admin.site.register(ItemsOwned, ItemsOwnedAdmin)