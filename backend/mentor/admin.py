from django.contrib import admin
from .models import Course

class CourseAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'mentor','description', 'cover_photo')

admin.site.register(Course, CourseAdmin)
