# Generated by Django 3.0.8 on 2020-07-20 21:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('characters', '0012_auto_20200720_0029'),
    ]

    operations = [
        migrations.AddField(
            model_name='mission',
            name='levelMax',
            field=models.IntegerField(default=20),
        ),
        migrations.AddField(
            model_name='mission',
            name='levelMin',
            field=models.IntegerField(default=1),
        ),
    ]