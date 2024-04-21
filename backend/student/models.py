from django.db import models
from accounts.models import User
from mentor.models import Course, Chapter

class CourseProgress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='course_progress')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='course_progress')
    progress_percentage = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.user.username} - {self.course.title}"

class ChapterProgress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='chapter_progress')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='chapter_progress')
    chapter = models.ForeignKey(Chapter, on_delete=models.CASCADE, related_name='chapter_progress')
    progress_percentage = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.user.username} - {self.course.title} - {self.chapter.title}"

class EngagementProgress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='engagement_progress')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='engagement_progress')
    engaged_frames = models.IntegerField(default=0)
    total_frames = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.user.username} - {self.course.title} - Engagement"

class VerificationProgress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='verification_progress')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='verification_progress')
    verification_percentage = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.user.username} - Verification"