# Generated by Django 3.0.8 on 2020-07-22 14:13

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('characters', '0016_item_typeofitem'),
    ]

    operations = [
        migrations.AlterField(
            model_name='playercharacterclass',
            name='dateCreated',
            field=models.DateField(blank=True, default=datetime.date.today, null=True),
        ),
    ]
