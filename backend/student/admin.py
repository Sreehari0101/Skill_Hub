from django.contrib import admin
from .models import CourseProgress, ChapterProgress

@admin.register(CourseProgress)
class CourseProgressAdmin(admin.ModelAdmin):
    list_display = ['user', 'course', 'progress_percentage']
    search_fields = ['user']
    list_editable = ['course', 'progress_percentage']

@admin.register(ChapterProgress)
class ChapterProgressAdmin(admin.ModelAdmin):
    list_display = ['user', 'course', 'chapter', 'progress_percentage']
    search_fields = ['user']
    