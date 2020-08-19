from rest_framework import serializers
from .models import *

class CharacterSerializer(serializers.ModelSerializer):
  class Meta:
      model = Character
      fields = (
      'id', 
      'raceName', 
      'maxHp', 
      'armorClass', 
      'passivePerception', 
      'dateCreated', 
      'creator', 
      'altVision', 
      'fullName', 
      'dead', 
      'startingCheckmarks', 
      'dateOfDeath',
    )

class CharacterRaceSerializer(serializers.ModelSerializer):
  class Meta:
      model = CharacterRace
      fields = ('id', 'raceName')

class PlayerCharacterClassSerializer(serializers.ModelSerializer):
  dateCreated = serializers.DateField(input_formats=['%d-%m-%Y','iso-8601'])

  class Meta:
      model = PlayerCharacterClass
      fields = ('id', 'playerClass', 'classCharacter', 'levelNumber', 'dateCreated')

class MissionSerializer(serializers.ModelSerializer):
  playedOn = serializers.DateField(input_formats=['%d-%m-%Y','iso-8601'])

  class Meta:
      model = Mission
      fields = ('id', 'name', 'dm', 'characters', 'playedOn', 'visable', 'episode', 'levelMin', 'levelMax')

class CharacterSubClassSerializer(serializers.ModelSerializer):
  class Meta:
      model = CharacterSubClass
      fields = ('id', 'className', 'subclassName', 'subclassLevel', 'isClass')

class TransactionSerializer(serializers.ModelSerializer):

  class Meta:
    model = Transaction
    fields = ('id', 'name', 'goldPcs', 'silverPcs', 'copperPcs', 'mission', 'characters', 'airshipPot', 'earnedSpent', 'creationDate')

class DowntimeSerializer(serializers.ModelSerializer):

  class Meta:
    model = Downtime
    fields = ('id', 'description', 'character', 'numOfDaysSpent', 'downtimeType', 'creationDate')

class DowntimeTypeSerializer(serializers.ModelSerializer):

  class Meta:
    model = DowntimeType
    fields = ('id', 'name', 'description')

class ItemSerializer(serializers.ModelSerializer):

  class Meta:
    model = Item
    fields = ('id', 'name', 'costGold', 'costSilver', 'costCopper', 'description', 'numberInSkymall', 'canBePurchasedBy', 'allPcsCanPurchase', 'downtimeCost', 'typeOfItem')

class ItemsOwnedSerializer(serializers.ModelSerializer):

  class Meta:
    model = ItemsOwned
    fields = ('id', 'item', 'character', 'qty', 'dateLastModified')

class DowntimeJobsSerializer(serializers.ModelSerializer):

  class Meta:
    model = DowntimeJobs
    fields = ('id', 'name', 'chosenClass', 'validUntil')

class AirshipUpgradeSerializer(serializers.ModelSerializer):

  class Meta:
    model = AirshipUpgrades
    fields = ('id', 'upgradeType', 'amount', 'fromAirshipPot', 'creationDate')
