from django.urls import path
from .views import start_tracking, stop_tracking

urlpatterns = [
    path('start-tracking/<int:courseId>/', start_tracking, name='start_tracking'),
    path('stop-tracking/<int:courseId>/', stop_tracking, name='stop_tracking'),
]