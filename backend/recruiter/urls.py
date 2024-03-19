from django.urls import path
from .views import CompanyProfileAPIView, JobListCreateAPIView, JobDetailAPIView, CompanyProfileDetailView

urlpatterns = [
    path('company-profile/', CompanyProfileAPIView.as_view(), name='company-profile'),
    path('company_profiles/<int:company_profile_id>/', CompanyProfileDetailView.as_view(), name='company_profile_detail'),
    path('jobs/', JobListCreateAPIView.as_view(), name='job-list-create'),
    path('jobs/<int:pk>/', JobDetailAPIView.as_view(), name='job-detail'),
]
