from accounts.models import User
import cv2 
from scipy.spatial import distance as dist
from imutils.video import VideoStream
from imutils import face_utils
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
import imutils
import time
import dlib
import os    
from rest_framework.views import APIView
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import CourseProgress, ChapterProgress, EngagementProgress
from mentor.models import Course, Chapter
from django.db.models import F
from .serializers import CourseProgressSerializer, ChapterProgressSerializer

class VideoStreamManager:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.vs = None  # Initialize VideoStream object
        return cls._instance

    def get_vs(self):
        return self.vs

    def set_vs(self, vs):
        self.vs = vs

# Create a global instance of the VideoStreamManager
video_stream_manager = VideoStreamManager()

global EYE_AR_THRESH, COUNTER, TOTAL, LOOKDOWN_COUNTER
EYE_AR_THRESH = 1
COUNTER = 0
TOTAL = 0
LOOKDOWN_COUNTER = 0

def eye_aspect_ratio(eye):
    A = dist.euclidean(eye[1], eye[5])
    B = dist.euclidean(eye[2], eye[4])
    C = dist.euclidean(eye[0], eye[3])
    ear = (A + B) / (2.0 * C)
    return ear

@csrf_exempt
@require_POST
def start_tracking(request, courseId, userId):
    global EYE_AR_THRESH, COUNTER, TOTAL, LOOKDOWN_COUNTER

    fps = 10
    EYE_AR_CONSEC_FRAMES = 2 * fps

    detector = dlib.get_frontal_face_detector()
    current_dir = os.path.dirname(os.path.abspath(__file__))
    parent_dir = os.path.abspath(os.path.join(current_dir, os.pardir))
    shape_predictor_path = os.path.join(parent_dir, 'models', 'shape_predictor_68_face_landmarks.dat')
    predictor = dlib.shape_predictor(shape_predictor_path)  # Initialize predictor

    (lStart, lEnd) = face_utils.FACIAL_LANDMARKS_IDXS["left_eye"]
    (rStart, rEnd) = face_utils.FACIAL_LANDMARKS_IDXS["right_eye"]

    vs_manager = video_stream_manager.get_vs()
    if vs_manager is None:
        vs_manager = VideoStream(src=0, resolution=(640, 480), framerate=30).start()
        video_stream_manager.set_vs(vs_manager)
        print("Video capturing started")

    _sum = 0
    _counter = int(5 * fps)
    disengaged = False
    LOOKDOWN_COUNTER = 0
    total_frames = 0
    engaged_frames = 0

    while True:
        frame = vs_manager.read()
        frame = imutils.resize(frame, width=800, height= 800)
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        rects = detector(gray, 0)
        
        if len(rects) != 0:
            LOOKDOWN_COUNTER = 0
            shape = predictor(gray, rects[0])
            shape = face_utils.shape_to_np(shape)
            leftEye = shape[lStart:lEnd]
            rightEye = shape[rStart:rEnd]
            leftEAR = eye_aspect_ratio(leftEye)
            rightEAR = eye_aspect_ratio(rightEye)
            ear = (leftEAR + rightEAR) / 2.0

            if EYE_AR_THRESH == 1:
                if _counter > 0:
                    _sum += ear
                    _counter -= 1
                else:
                    EYE_AR_THRESH = _sum / int(5 * fps) * 0.9
                    start = int(time.time())
            
            if _counter == 0:       
                leftEyeHull = cv2.convexHull(leftEye)
                rightEyeHull = cv2.convexHull(rightEye)
                cv2.drawContours(frame, [leftEyeHull], -1, (0, 255, 0), 1)
                cv2.drawContours(frame, [rightEyeHull], -1, (0, 255, 0), 1)
                
                if COUNTER >= EYE_AR_CONSEC_FRAMES:
                    disengaged = True
                    total_frames += 1
                    TOTAL += 1
                    if ear >= EYE_AR_THRESH:
                        COUNTER = 0
                    else:
                        COUNTER += 1
                elif COUNTER < EYE_AR_CONSEC_FRAMES:
                    disengaged = False
                    total_frames += 1
                    engaged_frames += 1
                    if ear < EYE_AR_THRESH:
                        COUNTER += 1
                    else:
                        COUNTER = 0
               
                if disengaged:
                    print("Disengaged")
                    cv2.putText(frame, "Disengaged",(10, 30),           # visual output
                        cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)
                else:
                    print("Engaged")
                    cv2.putText(frame, "Engaged",(10, 30),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
                cv2.putText(frame, "EAR: {:.2f}".format(ear), (300, 30),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 0, 0), 2)
                cv2.putText(frame, "Total: {:.2f}".format(TOTAL/fps),(300, 70),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 0, 0), 2)

                print("EAR:", ear)
                print("Total Disengaged:", TOTAL / fps)

        elif EYE_AR_THRESH != 1:
            LOOKDOWN_COUNTER += 1
            ear = 0

            if LOOKDOWN_COUNTER >= EYE_AR_CONSEC_FRAMES:
                disengaged = True
                TOTAL += 1
                total_frames += 1

            if disengaged:
                print("Disengaged")
                cv2.putText(frame, "Disengaged",(10, 30),           # visual output
                        cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)
            else:
                print("Engaged")
                cv2.putText(frame, "Engaged",(10, 30),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
            cv2.putText(frame, "EAR: {:.2f}".format(ear), (300, 30),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 0, 0), 2)
            cv2.putText(frame, "Total: {:.2f}".format(TOTAL/fps),(300, 70),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 0, 0), 2)
            print("EAR:", ear)
            print("Total Disengaged:", TOTAL / fps)

        if total_frames > 0:
            engagement_percentage = (engaged_frames / total_frames) * 100
            print(f"Engagement Percentage: {int(engagement_percentage)}%")

        cv2.imshow("Frame", frame)
        key = cv2.waitKey(1) & 0xFF
        if not video_stream_manager.get_vs():
            print(total_frames)
            print(engaged_frames)
            user = User.objects.get(pk=userId) 
            course = Course.objects.get(pk=courseId)
            engagement_instance, created = EngagementProgress.objects.get_or_create(user=user, course=course)
            engagement_instance.engaged_frames = F('engaged_frames') + engaged_frames
            engagement_instance.total_frames = F('total_frames') + total_frames
            engagement_instance.save()
            print("stopped finally") 
            break

    cv2.destroyAllWindows()
    vs_manager.stop()
    print("Tracking stopped successfully")
    return HttpResponse("Tracking stopped successfully")


@csrf_exempt
@require_POST
def stop_tracking(request, courseId, userId):
    global EYE_AR_THRESH, COUNTER, TOTAL, LOOKDOWN_COUNTER
    vs_manager = video_stream_manager.get_vs()
    if vs_manager:
       
        video_stream_manager.set_vs(None)
        EYE_AR_THRESH = 1
        COUNTER = 0
        TOTAL = 0
        LOOKDOWN_COUNTER = 0
        print("Requested to stop")
        return HttpResponse("Requested to stop")
    else:
        print("Tracking is not running")
        return HttpResponse("Tracking is not running")


class CourseProgressAPIView(generics.UpdateAPIView):
    queryset = CourseProgress.objects.all()
    serializer_class = CourseProgressSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, course_id):
        try:
            # Get the requested user
            user = request.user

            # Calculate completed chapters count for the requested user
            completed_chapters_count = ChapterProgress.objects.filter(
                user=user, course_id=course_id, progress_percentage=100
            ).count()

            # Get the total chapters count for the course
            total_chapters_count = Course.objects.get(id=course_id).chapters.count()
            
            # Calculate course progress percentage
            course_progress = (
                (completed_chapters_count / total_chapters_count) * 100
                if total_chapters_count > 0
                else 0
            )

            # Update course progress or create if not exists
            course_progress_instance, created = CourseProgress.objects.update_or_create(
                user=user,
                course_id=course_id,
                defaults={"progress_percentage": course_progress},
            )

            return Response(
                {
                    "completed_chapters": completed_chapters_count,
                    "total_chapters": total_chapters_count,
                    "course_progress": course_progress,
                    "message": "Course progress calculated and stored successfully",
                },
                status=status.HTTP_200_OK,
            )
        except Course.DoesNotExist:
            return Response({"error": "Course not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
class ChapterProgressUpdateAPIView(generics.UpdateAPIView):
    queryset = ChapterProgress.objects.all()
    serializer_class = ChapterProgressSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = self.request.user
        progress_percentage = request.data.get('progress')
        course_id = kwargs.get('course_id') 
        chapter_id = kwargs.get('chapter_id')  

        try:
            course = Course.objects.get(pk=course_id)
            chapter = Chapter.objects.get(pk=chapter_id)
            chapter_progress, created = ChapterProgress.objects.update_or_create(
                    user=user,
                    course=course,
                    chapter=chapter,
                    defaults={'progress_percentage': progress_percentage}
                )
            return Response({'message': 'Chapter progress updated successfully'}, status=status.HTTP_200_OK)
        except ChapterProgress.DoesNotExist:
            return Response({'error': 'Chapter progress not found'}, status=status.HTTP_404_NOT_FOUND)
        

class ChapterProgressAPIView(APIView):
    def get(self, request, course_id):
        try:
            user = request.user
            chapter_progress = ChapterProgress.objects.filter(user=user, course_id=course_id)
            serializer = ChapterProgressSerializer(chapter_progress, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class EngagementPercentageAPIView(APIView):
    def get(self, request, course_id):
        try:
            user = request.user
            engagement_instance = EngagementProgress.objects.get(user=user, course_id=course_id)
            engagement_percentage = (
                (engagement_instance.engaged_frames / engagement_instance.total_frames) * 100
                if engagement_instance.total_frames > 0
                else 0
            )
            response_data = {
                "engaged_frames": engagement_instance.engaged_frames,
                "total_frames": engagement_instance.total_frames,
                "engagement_percentage": engagement_percentage,
                "message": "Engagement percentage calculated successfully",
            }

            return Response(response_data, status=status.HTTP_200_OK)
        except EngagementProgress.DoesNotExist:
            return Response({"error": "Engagement progress not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)