from django.urls import path
from .views import CourseListCreateAPIView, ChapterCreateAPIView, CourseListAPIView, ChapterListAPIView, CourseEnroll, CourseEnrollList, NotesCreateAPIView

urlpatterns = [
    path('courses/', CourseListCreateAPIView.as_view(), name='course-list-create'),
    path('courses-list/', CourseListAPIView.as_view(), name='course-list'),
    path('chapters/<int:courseId>/', ChapterCreateAPIView.as_view(), name='chapter-create'),
    path('notes/<int:courseId>/', NotesCreateAPIView.as_view(), name='upload-notes'),
    path('chapters-list/<int:courseId>/', ChapterListAPIView.as_view(), name='chapter-list'),
    path('enroll/', CourseEnroll.as_view(), name='enroll'),
    path('course-enroll-list/', CourseEnrollList.as_view(), name='course-enroll-list'),
]