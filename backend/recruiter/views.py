from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from .models import CompanyProfile, Job, JobApplication
from .serializers import CompanyProfileSerializer, JobSerializer, JobApplicationSerializer
from rest_framework.generics import ListCreateAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from .models import CompanyProfile

class CompanyProfileAPIView(ListCreateAPIView):
    queryset = CompanyProfile.objects.all()
    serializer_class = CompanyProfileSerializer
    permission_classes = (IsAuthenticated,)
    parser_classes = [MultiPartParser, FormParser]

    def perform_create(self, serializer):
        try:
            existing_profile = CompanyProfile.objects.filter(user=self.request.user).first()

            if existing_profile:
                serializer.instance = existing_profile
                serializer.is_valid(raise_exception=True)
                if 'logo' not in self.request.FILES:
                    print("reached")
                    serializer.validated_data['logo'] = existing_profile.logo
                serializer.save()
            else:

                serializer.save(user=self.request.user)

        except Exception as e:
            print("Error processing CompanyProfileAPIView:", str(e))
            return Response({"error": "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        
    def list(self, request, *args, **kwargs):
        # Override list method to get the CompanyProfile for the current user
        queryset = CompanyProfile.objects.filter(user=self.request.user)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def get_object(self):
        # Override get_object to get the CompanyProfile for the current user
        queryset = self.filter_queryset(self.get_queryset())
        obj = queryset.filter(user=self.request.user).first()
        return obj
    

class CompanyProfileDetailView(APIView):
    def get(self, request, company_profile_id):
        try:
            company_profile = CompanyProfile.objects.get(id=company_profile_id)
            serializer = CompanyProfileSerializer(company_profile)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except CompanyProfile.DoesNotExist:
            return Response({"error": "Company profile not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class JobListCreateAPIView(ListCreateAPIView):
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        user_type = user.user_type

        if user_type == 'recruiter':
            return Job.objects.filter(company_profile__user=user)
        else:
            return Job.objects.all()

    def perform_create(self, serializer):
        company_profile = self.request.user.company_profile
        serializer.save(company_profile=company_profile)


class JobDetailAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]

class JobApplicationListCreateAPIView(ListCreateAPIView):
    queryset = JobApplication.objects.all()
    serializer_class = JobApplicationSerializer
    permission_classes = [IsAuthenticated]

