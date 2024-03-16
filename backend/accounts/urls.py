from django.urls import path
from rest_framework_simplejwt.views import (TokenRefreshView)
from . import views

urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(),name="token-obtain"),
    path('token/refresh/', TokenRefreshView.as_view(), name="refresh-token"),
    path('register/', views.RegisterView.as_view(), name="register-user"),
    path('test/', views.protectedView, name="test"),
    path('', views.view_all_routes, name="all-routes"),
    path('student-profile/', views.StudentProfileAPIView.as_view(), name='student-profile'),
    path('mentor-profile/', views.MentorProfileAPIView.as_view(), name='mentor-profile'),
    path('recruiter-profile/', views.RecruiterProfileAPIView.as_view(), name='recruiter-profile'),
]