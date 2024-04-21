from django.urls import path
from .views import start_tracking, stop_tracking, ChapterProgressUpdateAPIView, ChapterProgressAPIView, CourseProgressAPIView, EngagementPercentageAPIView

urlpatterns = [
    path('start-tracking/<int:courseId>/<int:userId>/', start_tracking, name='start_tracking'),
    path('stop-tracking/<int:courseId>/<int:userId>/', stop_tracking, name='stop_tracking'),
    path('update-course-progress/<int:course_id>/<int:chapter_id>/', ChapterProgressUpdateAPIView.as_view(), name='update_chapter_progress'),
    path('chapter-progress/<int:course_id>/', ChapterProgressAPIView.as_view(), name='chapter_progress'),
    path('course-progress/<int:course_id>/', CourseProgressAPIView.as_view(), name='chapter_progress'),
    path('student-progress/<int:course_id>/', EngagementPercentageAPIView.as_view(), name='student_progress'),
]