from django.contrib import admin
from .models import CourseProgress, ChapterProgress, EngagementProgress, VerificationProgress

@admin.register(CourseProgress)
class CourseProgressAdmin(admin.ModelAdmin):
    list_display = ['user', 'course', 'progress_percentage']
    search_fields = ['user']
    list_editable = ['course', 'progress_percentage']

@admin.register(ChapterProgress)
class ChapterProgressAdmin(admin.ModelAdmin):
    list_display = ['user', 'course', 'chapter', 'progress_percentage']
    search_fields = ['user']

@admin.register(EngagementProgress)
class EngagementProgressAdmin(admin.ModelAdmin):
    list_display = ['user', 'course', 'engaged_frames', 'total_frames']
    search_fields = ['user']
    list_editable = ['course']

@admin.register(VerificationProgress)
class VerificationProgressAdmin(admin.ModelAdmin):
    list_display = ['user', 'course', 'verification_percentage']
    search_fields = ['user']
    