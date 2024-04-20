from django.urls import path
from .views import CompanyProfileAPIView, JobListCreateAPIView, JobDetailAPIView, CompanyProfileDetailView, JobApplicationCreateAPIView, JobApplicationListCreateAPIView, JobApply, JobApplyList

urlpatterns = [
    path('company-profile/', CompanyProfileAPIView.as_view(), name='company-profile'),
    path('company_profiles/<int:company_profile_id>/', CompanyProfileDetailView.as_view(), name='company_profile_detail'),
    path('jobs/', JobListCreateAPIView.as_view(), name='job-list-create'),
    path('jobs/<int:pk>/', JobDetailAPIView.as_view(), name='job-detail'),
    path('job-applications/', JobApplicationCreateAPIView.as_view(), name='job-application-list-create'),
    path('job-applications/<int:job_id>/', JobApplicationListCreateAPIView.as_view(), name='job-applications-list-create'),
    path('apply/', JobApply.as_view(), name='enroll'),
    path('job-apply-list/', JobApplyList.as_view(), name='course-enroll-list'),
]
