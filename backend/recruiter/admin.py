from django.contrib import admin
from .models import CompanyProfile, Job

@admin.register(CompanyProfile)
class CompanyProfileAdmin(admin.ModelAdmin):
    list_display = ['name', 'description', 'website', 'email', 'display_logo']
    search_fields = ['name']

    def display_logo(self, obj):
        return obj.logo.url if obj.logo else "No Logo"
    
    display_logo.short_description = 'Logo'
@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = ['title', 'recruiter', 'company_profile', 'job_type', 'work_place', 'last_date_of_application']
    search_fields = ['title', 'recruiter__username', 'company_profile__name']

