from rest_framework import serializers
from accounts.serializers import UserSerializer
from .models import CompanyProfile, Job, JobApplication

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
    user = serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault())
    company_profile = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Job
        fields = [
            'id', 'user', 'company_profile', 'title', 'description', 'job_type',
            'work_place', 'round_details', 'salary_package', 'last_date_of_application'
        ]

    def create(self, validated_data):
        user = self.context['request'].user
        job = Job.objects.create(user=user, **validated_data)
        return job

class JobApplicationSerializer(serializers.ModelSerializer):
    applicant = serializers.PrimaryKeyRelatedField(read_only=True)
    job = serializers.PrimaryKeyRelatedField(queryset=Job.objects.all())  
    
    class Meta:
        model = JobApplication
        fields = '__all__'

class JobApplySerializer(serializers.Serializer):
    jobId = serializers.IntegerField()
