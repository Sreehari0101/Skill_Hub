from django.contrib import admin
from .models import CompanyProfile, Job, JobApplication

@admin.register(CompanyProfile)
class CompanyProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'name', 'description', 'website', 'email', 'logo']
    search_fields = ['name']
    list_editable = [ 'name', 'description', 'website', 'email', 'logo']

@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = ['title', 'user', 'company_profile', 'job_type', 'work_place', 'last_date_of_application']
    search_fields = ['title', 'user__username', 'company_profile__name']

@admin.register(JobApplication)
class JobApplicationAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'job', 'applicant', 'email', 'contact_number', 'country', 'state']
    search_fields = ['full_name', 'job__title', 'applicant__username']