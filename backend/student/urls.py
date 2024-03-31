from django.urls import path
from .views import start_tracking, pause_tracking, stop_tracking

urlpatterns = [
    path('start-tracking/', start_tracking, name='start_tracking'),
    path('pause-tracking/', pause_tracking, name='pause_tracking'),
    path('stop-tracking/', stop_tracking, name='stop_tracking'),
]