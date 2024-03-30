from django.contrib import admin
from .models import Course, Chapter, Note

class CourseAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'mentor', 'description', 'cover_photo', 'display_enrolled_users')
    list_filter = ('mentor',)
    search_fields = ('title', 'mentor__username')

    def display_enrolled_users(self, obj):
        return ', '.join([user.username for user in obj.enrolled_users.all()])

    display_enrolled_users.short_description = 'Enrolled Users'

admin.site.register(Course, CourseAdmin)

@admin.register(Chapter)
class ChapterAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'course', 'video_url')
    list_filter = ('course',)
    search_fields = ('title',)

@admin.register(Note)
class NoteAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'course', 'file_url')
    list_filter = ('course',)
    search_fields = ('title',)
