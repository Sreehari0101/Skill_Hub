
from django.http import JsonResponse

def start_tracking(request):
    print("Tracking started")
    return JsonResponse({"message": "Tracking started"}, status=200)

def pause_tracking(request):
    print("Tracking paused")
    return JsonResponse({"message": "Tracking paused"}, status=200)

def stop_tracking(request):
    print("Tracking stopped")
    return JsonResponse({"message": "Tracking stopped"}, status=200)