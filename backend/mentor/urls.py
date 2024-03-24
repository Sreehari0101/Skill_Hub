from django.urls import path
from .views import CourseListCreateAPIView, CourseRetrieveUpdateDestroyAPIView, ChapterCreateAPIView

urlpatterns = [
    path('courses/', CourseListCreateAPIView.as_view(), name='course-list-create'),
    path('courses/<int:pk>/', CourseRetrieveUpdateDestroyAPIView.as_view(), name='course-retrieve-update-destroy'),
    path('chapters/<int:courseId>/', ChapterCreateAPIView.as_view(), name='chapter-create'),
]