from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    username = models.CharField(max_length=100)
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    USER_TYPE_CHOICES = [
        ('student', 'Student'),
        ('mentor', 'Mentor'),
        ('recruiter', 'Recruiter'),
    ]

    user_type = models.CharField(
        max_length=10,
        choices=USER_TYPE_CHOICES,
        default='student',
    )

    def get_profile(self):
        return getattr(self, f'{self.user_type.lower()}profile', None)

def create_user_profiles(sender, instance, created, **kwargs):
    if created:
        user_type = instance.user_type
        full_name = instance.username 

        if user_type == 'student':
            StudentProfile.objects.get_or_create(user=instance, full_name=full_name)
        elif user_type == 'mentor':
            MentorProfile.objects.get_or_create(user=instance, full_name=full_name)
        elif user_type == 'recruiter':
            RecruiterProfile.objects.get_or_create(user=instance, full_name=full_name)

post_save.connect(create_user_profiles, sender=User)


class StudentProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, unique=True)
    full_name = models.CharField(max_length=1000)
    username = models.CharField(max_length=150,default='',null=True)
    email = models.EmailField(default='',null=True)
    profile_photo = models.ImageField(upload_to='profile_photos', null=True, default="profile_photos/Default_icon.jpg")


class MentorProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, unique=True)
    full_name = models.CharField(max_length=1000)
    username = models.CharField(max_length=150,default='',null=True)
    email = models.EmailField(default='',null=True)
    profile_photo = models.ImageField(upload_to='profile_photos', null=True, default="profile_photos/Default_icon.jpg")

class RecruiterProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, unique=True)
    full_name = models.CharField(max_length=1000)
    username = models.CharField(max_length=150,default='',null=True)
    email = models.EmailField(default='',null=True)
    profile_photo = models.ImageField(upload_to='profile_photos', null=True, default="profile_photos/Default_icon.jpg")
