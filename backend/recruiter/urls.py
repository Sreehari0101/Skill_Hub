from django.urls import path
from .views import CompanyProfileAPIView, JobListCreateAPIView, JobDetailAPIView

urlpatterns = [
    path('company-profile/', CompanyProfileAPIView.as_view(), name='company-profile'),
    path('jobs/', JobListCreateAPIView.as_view(), name='job-list-create'),
    path('jobs/<int:pk>/', JobDetailAPIView.as_view(), name='job-detail'),
]
