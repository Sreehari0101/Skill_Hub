from django.urls import path
from .views import CourseListCreateAPIView, CourseRetrieveUpdateDestroyAPIView

urlpatterns = [
    path('courses/', CourseListCreateAPIView.as_view(), name='course-list-create'),
    path('courses/<int:pk>/', CourseRetrieveUpdateDestroyAPIView.as_view(), name='course-retrieve-update-destroy'),
]