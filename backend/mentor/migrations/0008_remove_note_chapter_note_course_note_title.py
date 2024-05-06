# Generated by Django 5.0.1 on 2024-03-29 04:47

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mentor', '0007_course_enroll_course_enrolled_users_note'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='note',
            name='chapter',
        ),
        migrations.AddField(
            model_name='note',
            name='course',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='notes', to='mentor.course'),
        ),
        migrations.AddField(
            model_name='note',
            name='title',
            field=models.CharField(max_length=100, null=True),
        ),
    ]