from django.db import models
from accounts.models import User

class CompanyProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='company_profile')
    logo = models.ImageField(upload_to='company_logos/', blank=True, default="profile_photos/Default_icon.jpg")
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    website = models.CharField(max_length=255)
    email = models.EmailField(blank=True)

    def __str__(self):
        return self.name
    

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
    applied_users = models.ManyToManyField(User, related_name='applied_jobs', blank=True, verbose_name='Applied Users')

    def __str__(self):
        return self.title
    
class JobApplication(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='applications')
    applicant = models.ForeignKey(User, on_delete=models.CASCADE, related_name='job_applications')
    full_name = models.CharField(max_length=255)
    contact_number = models.CharField(max_length=15)
    email = models.EmailField()
    country = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    address = models.TextField()
    resume_cv = models.FileField(upload_to='resumes/')
    skill_hub_certificate = models.FileField(upload_to='certificates/')
    
    

    def __str__(self):
        return f"{self.full_name} - {self.job.title}"