# Generated by Django 4.0.3 on 2024-03-22 21:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='automobilevo',
            name='import_href',
            field=models.CharField(max_length=200),
        ),
        migrations.AlterField(
            model_name='automobilevo',
            name='vin',
            field=models.CharField(max_length=17),
        ),
    ]