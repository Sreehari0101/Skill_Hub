from django.contrib import admin
from .models import User, StudentProfile, MentorProfile, RecruiterProfile

class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email', 'user_type']
    list_editable = ['user_type']

class StudentProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'full_name','bio','verified']
    list_editable = ['verified','full_name']

class MentorProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'full_name','bio','verified']
    list_editable = ['verified',"full_name"]

class RecruiterProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'full_name','bio','verified']
    list_editable = ['verified',"full_name"]

admin.site.register(User, UserAdmin)
admin.site.register(StudentProfile, StudentProfileAdmin)
admin.site.register(MentorProfile, MentorProfileAdmin)
admin.site.register(RecruiterProfile, RecruiterProfileAdmin)
