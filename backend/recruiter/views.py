from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from .models import CompanyProfile, Job
from .serializers import CompanyProfileSerializer, JobSerializer
from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from .models import CompanyProfile
from .serializers import CompanyProfileSerializer

class CompanyProfileAPIView(ListCreateAPIView):
    queryset = CompanyProfile.objects.all()
    serializer_class = CompanyProfileSerializer
    permission_classes = (IsAuthenticated,)
    parser_classes = [MultiPartParser, FormParser]

    def perform_create(self, serializer):
        try:
            # Check if the user already has a CompanyProfile
            existing_profile = CompanyProfile.objects.filter(user=self.request.user).first()

            if existing_profile:
                # If CompanyProfile exists, update it
                serializer.update(existing_profile, serializer.validated_data)
            else:
                # If CompanyProfile doesn't exist, create it
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

class JobListCreateAPIView(ListCreateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]

class JobDetailAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]

