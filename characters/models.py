from django.db import models
from datetime import date
from django import utils
import datetime
from django.contrib.auth.models import User
from django.db.models import Sum
import math

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
    ("Artificer", "Artificer"),
    ("Blood Hunter", "Blood Hunter")    
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

  fullName = models.CharField(max_length=255)
  raceName = models.ForeignKey(CharacterRace, on_delete=models.SET_NULL, null=True)
  dateCreated = models.DateField(default=datetime.date.today, blank=True, null=True)
  maxHp = models.IntegerField(blank=True, null=True)
  armorClass = models.IntegerField(blank=True, null=True)
  passivePerception = models.IntegerField(blank=True, null=True)
  altVision = models.CharField(max_length=4, choices=ALT_VISION_CHOICES, default='NORM')
  creator = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
  dead = models.BooleanField(default=False)
  dateOfDeath = models.DateField(null=True, blank=True)
  startingCheckmarks = models.IntegerField(default=0)

  @property
  def getCreatedLevels(self):
    return PlayerCharacterClass.objects.filter(classCharacter=self.id).count()

  @property
  def getCheckmarks(self):
    missioncount = Mission.objects.filter(characters__id__exact=self.id).count() 
    dmCount = Mission.objects.filter(dm_id=self.id).count() 
    trainingRoomCount = Downtime.objects.filter(downtimeType=1, character=self.id).aggregate(daysSpent=Sum('numOfDaysSpent'))['daysSpent']
    if isinstance(trainingRoomCount, int):
      trainingRoomCount = math.floor(trainingRoomCount / 10)
    else:
      trainingRoomCount = 0

    return trainingRoomCount + dmCount + missioncount + self.startingCheckmarks

  def __str__(self):
    return self.fullName

  @property
  def getEarnedLevel(self):
    LEVELS = [
      0,
      1,
      4,
      8,
      12,
      16,
      21,
      26,
      31,
      36,
      42,
      48,
      54,
      58,
      67,
      74,
      81,
      89,
      98,
      108,
    ]

    return LEVELS.index(min(LEVELS, key=lambda x: (abs(x - self.getCheckmarks)))) + 1

  @property
  def downtimeAvailable(self):
    missioncount = Mission.objects.filter(characters__id__exact=self.id).count() 
    dmCount = Mission.objects.filter(dm_id=self.id).count()
    
    try:
      missionsMissed = Mission.objects.filter(playedOn__gte=self.dateCreated, visable=True, playedOn__lte=self.dateOfDeath).exclude(characters__id__exact=self.id).exclude(dm_id=self.id)
    except:
      missionsMissed = Mission.objects.filter(playedOn__gte=self.dateCreated, visable=True).exclude(characters__id__exact=self.id).exclude(dm_id=self.id)
    
    countOfMissedMissions = 0
    for mission in missionsMissed:
      levelCount = PlayerCharacterClass.objects.filter(classCharacter=self.id, dateCreated__lte=mission.playedOn).count()
      if mission.levelMax >= levelCount and mission.levelMin <= levelCount:
        countOfMissedMissions += 1
    
    downtimeSpent = Downtime.objects.filter(character=self.id).aggregate(daysSpent=Sum('numOfDaysSpent'))['daysSpent']
    if isinstance(downtimeSpent, int):
      downtimeSpent = downtimeSpent
    else:
      downtimeSpent = 0

    return ((countOfMissedMissions * 2 + dmCount * 7 + missioncount * 5) - downtimeSpent)
  
  @property
  def goldTotalEarned(self):
    goldTotalEarned = 0 
    earnedTransactions = Transaction.objects.filter(characters__id__exact=self.id, earnedSpent=1)
    for transaction in earnedTransactions:
      if transaction.airshipPot:
        goldTotalEarned += (transaction.goldPcs * .9) + (transaction.silverPcs * .9) / 10 + (transaction.copperPcs * .9) / 100
      else:
        goldTotalEarned += transaction.goldPcs + transaction.silverPcs / 10 + transaction.copperPcs / 100

    return goldTotalEarned

class PlayerCharacterClass(models.Model):
  playerClass = models.ForeignKey(CharacterSubClass, on_delete=models.SET_NULL, null=True)
  classCharacter = models.ForeignKey(Character, on_delete=models.CASCADE, related_name='pcClasses')
  levelNumber = models.IntegerField(default=1)
  dateCreated = models.DateField(blank=True, null=True, default=datetime.date.today)

  def __str__(self):
    return self.playerClass.subclassName

class Mission(models.Model):

  name = models.CharField(max_length=255)
  characters = models.ManyToManyField(Character, related_name="missions", blank=True)
  dm = models.ForeignKey(Character, on_delete=models.SET_NULL, null=True, related_name="dmed", blank=True)
  playedOn = models.DateField()
  visable = models.BooleanField(default=True)
  episode = models.IntegerField(default=1)
  levelMin = models.IntegerField(default=1)
  levelMax = models.IntegerField(default=20)
  creator = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name="mission_created", blank=True)

  def __str__(self):
    return self.name


class DowntimeType(models.Model):
  name = models.CharField(max_length=100)
  description = models.TextField()

  def __str__(self):
    return self.name


class Item(models.Model):

  ITEM_TYPE_CHOICES = [
    ('Weapon', 'Weapon'),
    ('Armor', 'Armor'),
    ('Gear', 'Gear'),
    ('Magic', 'Magic'),
    ('Component', 'Component'),
  ]

  name = models.CharField(max_length=255)
  costGold = models.IntegerField(default=0)
  costSilver = models.IntegerField(default=0)
  costCopper = models.IntegerField(default=0)
  description = models.TextField()
  numberInSkymall = models.IntegerField()
  canBePurchasedBy = models.ManyToManyField(Character, related_name="itemPurchasedBy", blank=True)
  allPcsCanPurchase = models.BooleanField(default=True)
  downtimeCost = models.IntegerField(default=0)
  typeOfItem = models.CharField(choices = ITEM_TYPE_CHOICES, max_length=10, default='Gear')

  def __str__(self):
    return self.name

class ItemsOwned(models.Model):

  item = models.ForeignKey(Item, related_name="item", on_delete=models.CASCADE)
  character = models.ForeignKey(Character, related_name="owningCharacter", on_delete=models.CASCADE)
  qty = models.IntegerField()
  dateLastModified = models.DateField(default=datetime.date.today)


class DowntimeJobs(models.Model):

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
    ("Artificer", "Artificer"),
    ("Blood Hunter", "Blood Hunter")    
  ]

  name = models.CharField(max_length=255)
  chosenClass = models.CharField(max_length=255, choices=CLASS_CHOICES)
  validUntil = models.DateField(null=True, blank=True)

  def __str__(self):
    return self.name & " Downtime Job"



class Downtime(models.Model):
  
  description = models.TextField()
  character = models.ForeignKey(Character, related_name="downtimeSpend", on_delete=models.CASCADE)
  numOfDaysSpent = models.IntegerField()
  downtimeType = models.ForeignKey(DowntimeType, null=True, related_name="downtimeTransaction", on_delete=models.SET_NULL)
  creationDate = models.DateField(default=datetime.date.today)
  creator = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name="downtime_creator", blank=True)

  def __str__(self):
    return self.description
  
  
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
  creationDate = models.DateField(default=datetime.date.today)
  creator = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name="transaction_creator", blank=True)
  downtimeGoldTransaction = models.ForeignKey(Downtime, on_delete=models.CASCADE, null=True, blank=True, related_name="downtime_gold_transaction")

  def __str__(self):
    return self.name

class AirshipUpgrades(models.Model):
  
  UPGRADE_CHOICES = [
    ('Madam Lysalka\'s Tavern', 'Madam Lysalka\'s Tavern'),
    ('Carlyle\'s Trading Network', 'Carlyle\'s Trading Network'),
    ('The Blacksmith', 'The Blacksmith'),
    ('The Alchemist', 'The Alchemist'),
    ('The Master of Arms', 'The Master of Arms'),
    ('The Researcher', 'The Researcher')
  ]

  upgradeType = models.CharField(max_length=255, choices=UPGRADE_CHOICES)
  fromAirshipPot = models.BooleanField(default=False)
  amount = models.IntegerField()
  creationDate = models.DateField(default=datetime.date.today)
  downtimeAirshipUpgrade = models.ForeignKey(Downtime, on_delete=models.CASCADE, null=True, blank=True, related_name="downtime_airship_upgrade")

  def __str__(self):
    return '%s %s' % (self.upgradeType, self.amount)

