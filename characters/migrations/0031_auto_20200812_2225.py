# Generated by Django 3.0.8 on 2020-08-12 22:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('characters', '0030_auto_20200811_1238'),
    ]

    operations = [
        migrations.AddField(
            model_name='airshipupgrades',
            name='creationDate',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='downtime',
            name='creationDate',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='itemsowned',
            name='dateLastModified',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='transaction',
            name='creationDate',
            field=models.DateField(blank=True, null=True),
        ),
    ]
