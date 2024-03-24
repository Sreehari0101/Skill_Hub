from django.urls import path
from .views import CourseListCreateAPIView, ChapterCreateAPIView, CourseListAPIView, ChapterListAPIView

urlpatterns = [
    path('courses/', CourseListCreateAPIView.as_view(), name='course-list-create'),
    path('courses-list/', CourseListAPIView.as_view(), name='course-list-create'),
    path('chapters/<int:courseId>/', ChapterCreateAPIView.as_view(), name='chapter-create'),
    path('chapters-list/<int:courseId>/', ChapterListAPIView.as_view(), name='chapter-list'),
]