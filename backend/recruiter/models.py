from django.db import models
from accounts.models import User

class CompanyProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='company_profile')
    logo = models.ImageField(upload_to='company_logos/', blank=True, default="profile_photos/Default_icon.jpg")
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    website = models.CharField(max_length=255)
    email = models.EmailField(blank=True)

class Job(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='jobs')
    company_profile = models.ForeignKey(CompanyProfile, on_delete=models.CASCADE, related_name='jobs')
    title = models.CharField(max_length=255)
    description = models.TextField()
    job_type = models.CharField(max_length=20, choices=[('Full-time', 'Full-time'), ('Part-time', 'Part-time')])
    work_place = models.CharField(max_length=20, choices=[('Remote', 'Remote'), ('On-Site', 'On-Site')])
    round_details = models.TextField()
    salary_package = models.CharField(max_length=255)
    last_date_of_application = models.CharField(max_length=255)

    def __str__(self):
        return self.title