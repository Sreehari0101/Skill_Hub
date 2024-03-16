from django.shortcuts import render
from .models import User, StudentProfile, MentorProfile, RecruiterProfile
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .serializers import MyTOPS, RegistrationSerializer, StudentProfileSerializer, MentorProfileSerializer, RecruiterProfileSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTOPS

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegistrationSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def protectedView(request):
    output = f"Welcome {request.user}, Authentication SUccessful"
    return Response({'response':output}, status=status.HTTP_200_OK)

@api_view(['GET'])
def view_all_routes(request):
    data = [
        'accounts/token/refresh/',
        'accounts/register/',
        'accounts/token/'
    ]

    return Response(data)

class StudentProfileAPIView(ListCreateAPIView):
    queryset = StudentProfile.objects.all()
    serializer_class = StudentProfileSerializer
    permission_classes = (IsAuthenticated,)
    parser_classes = [MultiPartParser, FormParser]

    def perform_create(self, serializer):
        try:
            existing_profile = StudentProfile.objects.filter(user=self.request.user).first()

            if existing_profile:
                serializer.instance = existing_profile
                serializer.is_valid(raise_exception=True)
                if 'profile_photo' not in self.request.FILES:
                    print("reached")
                    serializer.validated_data['profile_photo'] = existing_profile.profile_photo
                serializer.save()
            else:
                serializer.save(user=self.request.user)

        except Exception as e:
            print("Error processing StudentProfileAPIView:", str(e))
            return Response({"error": "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        
    def list(self, request, *args, **kwargs):

        queryset = StudentProfile.objects.filter(user=self.request.user)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
        obj = queryset.filter(user=self.request.user).first()
        return obj
    
class MentorProfileAPIView(ListCreateAPIView):
    queryset = MentorProfile.objects.all()
    serializer_class = MentorProfileSerializer
    permission_classes = (IsAuthenticated,)
    parser_classes = [MultiPartParser, FormParser]

    def perform_create(self, serializer):
        try:
            existing_profile = MentorProfile.objects.filter(user=self.request.user).first()

            if existing_profile:
                serializer.instance = existing_profile
                serializer.is_valid(raise_exception=True)
                if 'profile_photo' not in self.request.FILES:
                    print("reached")
                    serializer.validated_data['profile_photo'] = existing_profile.profile_photo
                serializer.save()
            else:
                serializer.save(user=self.request.user)

        except Exception as e:
            print("Error processing MentorProfileAPIView:", str(e))
            return Response({"error": "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        
    def list(self, request, *args, **kwargs):

        queryset = MentorProfile.objects.filter(user=self.request.user)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
        obj = queryset.filter(user=self.request.user).first()
        return obj
    
class RecruiterProfileAPIView(ListCreateAPIView):
    queryset = RecruiterProfile.objects.all()
    serializer_class = RecruiterProfileSerializer
    permission_classes = (IsAuthenticated,)
    parser_classes = [MultiPartParser, FormParser]

    def perform_create(self, serializer):
        try:
            existing_profile = RecruiterProfile.objects.filter(user=self.request.user).first()

            if existing_profile:
                serializer.instance = existing_profile
                serializer.is_valid(raise_exception=True)
                if 'profile_photo' not in self.request.FILES:
                    print("reached")
                    serializer.validated_data['profile_photo'] = existing_profile.profile_photo
                serializer.save()
            else:
                serializer.save(user=self.request.user)

        except Exception as e:
            print("Error processing MentorProfileAPIView:", str(e))
            return Response({"error": "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        
    def list(self, request, *args, **kwargs):

        queryset = RecruiterProfile.objects.filter(user=self.request.user)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
        obj = queryset.filter(user=self.request.user).first()
        return obj