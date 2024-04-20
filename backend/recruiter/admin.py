from django.contrib import admin
from .models import CompanyProfile, Job, JobApplication

@admin.register(CompanyProfile)
class CompanyProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'name', 'description', 'website', 'email', 'logo']
    search_fields = ['name']
    list_editable = [ 'name', 'description', 'website', 'email', 'logo']

@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = ['title', 'user', 'company_profile', 'job_type', 'work_place', 'last_date_of_application','display_applied_users']
    search_fields = ['title', 'user__username', 'company_profile__name']
    def display_applied_users(self, obj):
        return ', '.join([user.username for user in obj.applied_users.all()])

    display_applied_users.short_description = 'Applied Users'

@admin.register(JobApplication)
class JobApplicationAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'job', 'applicant', 'email', 'contact_number', 'country', 'state','resume_cv','skill_hub_certificate']
    search_fields = ['full_name', 'job__title', 'applicant__username']