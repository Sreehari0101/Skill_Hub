from rest_framework import serializers
from accounts.serializers import UserSerializer
from .models import CompanyProfile, Job

class CompanyProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = CompanyProfile
        fields = ['id', 'user', 'name', 'description', 'website', 'email', 'logo']

    def create(self, validated_data):
        print("Inside create method of serializer") 
        logo = validated_data.pop('logo', None)
        
        try:
            instance = super().create(validated_data)
            if logo:
                instance.logo = logo
                instance.save()
            return instance
        except Exception as e:
            print("Error in create method of serializer:", str(e)) 
class JobSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    company_profile = CompanyProfileSerializer()

    class Meta:
        model = Job
        fields = [
            'id', 'user', 'company_profile', 'title', 'description', 'job_type',
            'work_place', 'round_details', 'salary_package', 'last_date_of_application'
        ]

    def create(self, validated_data):
        company_profile_data = validated_data.pop('company_profile')
        company_profile = CompanyProfile.objects.create(**company_profile_data)

        job = Job.objects.create(user=self.context['request'].user, company_profile=company_profile, **validated_data)
        return job
