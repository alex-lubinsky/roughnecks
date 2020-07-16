from django.db import models
from datetime import date
from django import utils
import datetime
from django.contrib.auth.models import User

# Create your models here.


class CharacterRace(models.Model):
  raceName = models.CharField(max_length=255)

  def __str__(self):
    return self.raceName

class CharacterSubClass(models.Model):

  CLASS_CHOICES = [
    ('Fighter', 'Fighter'),
    ('Cleric', 'Cleric'),
    ('Wizard', 'Wizard'),
    ('Bard', 'Bard'),
    ('Druid', 'Druid'),
    ('Barbarian', 'Barbarian'),
    ('Druid', 'Druid'),
    ('Monk', 'Monk'),
    ('Paladin', 'Paladin'),
    ('Ranger', 'Ranger'),
    ('Rogue', 'Rogue'),
    ('Sorcerer', 'Sorcerer'),
    ('Warlock', 'Warlock'),
    ("Artificer", "Artificer")    
  ]

  className = models.CharField(max_length=255, choices=CLASS_CHOICES)
  subclassName = models.CharField(max_length=255)
  subclassLevel = models.IntegerField()
  isClass = models.BooleanField()

  def __str__(self):
    return self.className + " - " + self.subclassName

class Character(models.Model):

  ALT_VISION_CHOICES = [
    ('60DV', '60 ft Dark Vision'),
    ('NORM', 'Normal Vision'),
  ]

  firstName = models.CharField(max_length=255)
  lastName = models.CharField(max_length=255, blank=True, null=True)
  raceName = models.ForeignKey(CharacterRace, on_delete=models.SET_NULL, null=True)
  dateCreated = models.DateField(default=datetime.date.today, blank=True, null=True)
  maxHp = models.IntegerField(blank=True, null=True)
  armorClass = models.IntegerField(blank=True, null=True)
  passivePerception = models.IntegerField(blank=True, null=True)
  altVision = models.CharField(max_length=4, choices=ALT_VISION_CHOICES, default='NORM')
  creator = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
  dead = models.BooleanField(default=False)

  def __str__(self):
    return self.firstName

class PlayerCharacterClass(models.Model):
  playerClass = models.ForeignKey(CharacterSubClass, on_delete=models.SET_NULL, null=True)
  classCharacter = models.ForeignKey(Character, on_delete=models.CASCADE, related_name='pcClasses')

  def __str__(self):
    return self.playerClass.subclassName

class Mission(models.Model):

  name = models.CharField(max_length=255)
  characters = models.ManyToManyField(Character, related_name="missions", blank=True)
  dm = models.ForeignKey(Character, on_delete=models.SET_NULL, null=True, related_name="dmed", blank=True)
  playedOn = models.DateField()
  visable = models.BooleanField(default=True)

  def __str__(self):
    return self.name

class Transaction(models.Model):

  TRANSACTION_CHOICES = [
    (-1, 'Spent'),
    (1, 'Earned')
  ]

  name = models.CharField(max_length=255)
  goldPcs = models.IntegerField()
  silverPcs = models.IntegerField()
  copperPcs = models.IntegerField()
  mission = models.ForeignKey(Mission, on_delete=models.CASCADE, related_name="transactions")
  characters = models.ManyToManyField(Character, related_name="transactions")
  airshipPot = models.BooleanField(default=True)
  earnedSpent = models.IntegerField(choices=TRANSACTION_CHOICES)

  def __str__(self):
    return self.name

class Downtime(models.Model):

  DOWNTIME_TYPE_CHOICES = [
    ('TR', 'Training Room'),
    ('MC', 'Miscellaneous')
  ]
  
  description = models.CharField(max_length=255)
  downtimeType = models.CharField(choices = DOWNTIME_TYPE_CHOICES, max_length=2)
  character = models.ForeignKey(Character, related_name="downtimeSpend", on_delete=models.CASCADE)
  numOfDaysSpent = models.IntegerField()


class Item(models.Model):

  name = models.CharField(max_length=255)
  costGold = models.IntegerField()
  costSilver = models.IntegerField()
  costCopper = models.IntegerField()
  description = models.TextField()
  numberInSkymall = models.IntegerField()

  def __str__(self):
    return self.name

class ItemsOwned(models.Model):

  item = models.ForeignKey(Item, related_name="item", on_delete=models.CASCADE)
  character = models.ForeignKey(Character, related_name="owningCharacter", on_delete=models.CASCADE)


