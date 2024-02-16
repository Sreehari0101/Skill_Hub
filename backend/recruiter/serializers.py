from rest_framework import serializers
from accounts.serializers import UserSerializer
from .models import CompanyProfile, Job

class CompanyProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyProfile
        fields = ['id', 'name', 'description', 'website', 'email']

class JobSerializer(serializers.ModelSerializer):
    recruiter = UserSerializer(read_only=True)
    company_profile = CompanyProfileSerializer()

    class Meta:
        model = Job
        fields = [
            'id', 'recruiter', 'company_profile', 'title', 'description', 'job_type',
            'work_place', 'round_details', 'salary_package', 'last_date_of_application'
        ]

    def create(self, validated_data):
        company_profile_data = validated_data.pop('company_profile')
        company_profile = CompanyProfile.objects.create(**company_profile_data)

        job = Job.objects.create(company_profile=company_profile, **validated_data)
        return job
