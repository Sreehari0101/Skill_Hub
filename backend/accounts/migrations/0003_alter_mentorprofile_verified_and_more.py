# Generated by Django 5.0.1 on 2024-02-04 19:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_rename_profile_mentorprofile_user_user_type_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mentorprofile',
            name='verified',
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name='recruiterprofile',
            name='verified',
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name='studentprofile',
            name='verified',
            field=models.BooleanField(default=True),
        ),
    ]
