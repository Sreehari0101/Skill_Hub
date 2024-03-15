from rest_framework import serializers
from rest_framework_simplejwt.tokens import Token
from django.contrib.auth.password_validation import validate_password
from .models import User, StudentProfile, MentorProfile, RecruiterProfile
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.validators import UniqueValidator

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'user_type']

class MyTOPS(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        profile = user.get_profile()
        token['full_name'] = profile.full_name
        token['username'] = user.username
        token['email'] = user.email
        token['user_type'] = user.user_type

        return token

class RegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    full_name = serializers.CharField(write_only=True, required=True)
    user_type = serializers.ChoiceField(choices=User.USER_TYPE_CHOICES)

    class Meta:
        model = User
        fields = ['full_name', 'email', 'username', 'password', 'password2', 'user_type']

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({'password': "Password Fields Didn't Match"})
        return attrs

    def create(self, validated_data):
        user_type = validated_data.pop('user_type', 'student')
        full_name = validated_data.pop('full_name')  # Get full_name from validated data
        email = validated_data.get('email')

        user = User.objects.create(
            username=validated_data['username'],
            email=email,
            user_type=user_type,
        )
        user.set_password(validated_data['password'])
        user.save()

        # Update user's full_name
        profile = user.get_profile()
        profile.full_name = full_name
        profile.save()
        
        return user