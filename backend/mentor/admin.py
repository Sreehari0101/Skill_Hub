from django.contrib import admin
from .models import Course, Chapter

class CourseAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'mentor','description', 'cover_photo')

admin.site.register(Course, CourseAdmin)

@admin.register(Chapter)
class ChapterAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'course', 'video_url') 
    list_filter = ('course',) 
    search_fields = ('title',) 