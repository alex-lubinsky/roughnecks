# Generated by Django 3.0.8 on 2020-07-30 15:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('characters', '0017_auto_20200722_1413'),
    ]

    operations = [
        migrations.AlterField(
            model_name='character',
            name='lastName',
            field=models.CharField(blank=True, default='', max_length=255),
            preserve_default=False,
        ),
    ]
