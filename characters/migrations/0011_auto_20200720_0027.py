# Generated by Django 3.0.8 on 2020-07-20 00:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('characters', '0010_auto_20200719_1351'),
    ]

    operations = [
        migrations.AddField(
            model_name='playercharacterclass',
            name='date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='playercharacterclass',
            name='levelNumber',
            field=models.IntegerField(default=1),
        ),
    ]
