from rest_framework import serializers
from .models import *

class CharacterSerializer(serializers.ModelSerializer):
  class Meta:
      model = Character
      fields = ('id', 'firstName', 'lastName', 'raceName', 'maxHp', 'armorClass', 'passivePerception', 'dateCreated', 'creator', 'altVision', 'dead')

class CharacterRaceSerializer(serializers.ModelSerializer):
  class Meta:
      model = CharacterRace
      fields = ('id', 'raceName')

class PlayerCharacterClassSerializer(serializers.ModelSerializer):
  class Meta:
      model = PlayerCharacterClass
      fields = ('id', 'playerClass', 'classCharacter')

class MissionSerializer(serializers.ModelSerializer):
  playedOn = serializers.DateField(input_formats=['%d-%m-%Y','iso-8601'])

  class Meta:
      model = Mission
      fields = ('id', 'name', 'dm', 'characters', 'playedOn', 'visable', 'episode')

class CharacterSubClassSerializer(serializers.ModelSerializer):
  class Meta:
      model = CharacterSubClass
      fields = ('id', 'className', 'subclassName', 'subclassLevel', 'isClass')

class PlayerCharacterClassQuerySerializer(serializers.ModelSerializer):
  playerClass = CharacterSubClassSerializer()

  class Meta:
      model = PlayerCharacterClass
      fields = ('id', 'playerClass', 'classCharacter')

class TransactionSerializer(serializers.ModelSerializer):

  class Meta:
    model = Transaction
    fields = ('id', 'name', 'goldPcs', 'silverPcs', 'copperPcs', 'mission', 'characters', 'airshipPot', 'earnedSpent')

class DowntimeSerializer(serializers.ModelSerializer):

  class Meta:
    model = Downtime
    fields = ('id', 'description', 'downtimeType', 'character', 'numOfDaysSpent')

class ItemSerializer(serializers.ModelSerializer):

  class Meta:
    model = Item
    fields = ('id', 'name', 'costGold', 'costSilver', 'costCopper', 'description', 'numberInSkymall')

class ItemsOwnedSerializer(serializers.ModelSerializer):

  class Meta:
    model = ItemsOwned
    fields = ('id', 'item', 'character')


class TransactionQuerySerializer(serializers.ModelSerializer):
  mission = MissionSerializer()
  characters = CharacterSerializer(many=True)

  class Meta:
    model = Transaction
    fields = ('id', 'name', 'goldPcs', 'silverPcs', 'copperPcs', 'mission', 'characters', 'airshipPot', 'earnedSpent')