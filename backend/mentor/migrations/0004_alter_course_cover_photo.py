# Generated by Django 5.0.1 on 2024-03-20 20:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mentor', '0003_course_mentor'),
    ]

    operations = [
        migrations.AlterField(
            model_name='course',
            name='cover_photo',
            field=models.FileField(null=True, upload_to='course_covers/'),
        ),
    ]
