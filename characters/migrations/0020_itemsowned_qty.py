# Generated by Django 3.0.8 on 2020-07-30 16:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('characters', '0019_auto_20200730_1612'),
    ]

    operations = [
        migrations.AddField(
            model_name='itemsowned',
            name='qty',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
    ]