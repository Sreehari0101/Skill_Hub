from django.db import models
from accounts.models import User

class Course(models.Model):
    mentor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='courses',null= True)
    title = models.CharField(max_length=100)
    description = models.TextField()
    cover_photo = models.ImageField(upload_to='course_covers/',null=True)

    def __str__(self):
        return self.title

class Chapter(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='chapters')
    title = models.CharField(max_length=100)
    video_url = models.URLField(null=True)
