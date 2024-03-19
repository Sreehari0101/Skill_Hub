# Generated by Django 5.0.1 on 2024-03-17 06:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0008_alter_studentprofile_profile_photo'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='mentorprofile',
            name='email',
        ),
        migrations.RemoveField(
            model_name='mentorprofile',
            name='full_name',
        ),
        migrations.RemoveField(
            model_name='mentorprofile',
            name='username',
        ),
        migrations.RemoveField(
            model_name='recruiterprofile',
            name='email',
        ),
        migrations.RemoveField(
            model_name='recruiterprofile',
            name='full_name',
        ),
        migrations.RemoveField(
            model_name='recruiterprofile',
            name='username',
        ),
        migrations.RemoveField(
            model_name='studentprofile',
            name='email',
        ),
        migrations.RemoveField(
            model_name='studentprofile',
            name='full_name',
        ),
        migrations.RemoveField(
            model_name='studentprofile',
            name='username',
        ),
        migrations.AlterField(
            model_name='mentorprofile',
            name='profile_photo',
            field=models.ImageField(default='profile_photos/Default_icon.jpg', null=True, upload_to='profile_photos'),
        ),
        migrations.AlterField(
            model_name='recruiterprofile',
            name='profile_photo',
            field=models.ImageField(default='profile_photos/Default_icon.jpg', null=True, upload_to='profile_photos'),
        ),
    ]