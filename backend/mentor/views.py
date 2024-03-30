from rest_framework import generics, status
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import Course, Chapter, Note
from .serializers import CourseSerializer, ChapterSerializer, NoteSerializer, CourseEnrollSerializer

class CourseListCreateAPIView(generics.CreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    def perform_create(self, serializer):
        serializer.save(mentor=self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            {"id": serializer.instance.id, **serializer.data},
            status=status.HTTP_201_CREATED,
            headers=headers
        )

class CourseListAPIView(generics.ListCreateAPIView):
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        user_type = user.user_type

        if user_type == 'mentor':
            return Course.objects.filter(mentor=user)
        else:
            enrolled_courses_ids = user.enrolled_courses.values_list('id', flat=True)
            return Course.objects.exclude(id__in=enrolled_courses_ids)

class ChapterCreateAPIView(generics.CreateAPIView):
    queryset = Chapter.objects.all()
    serializer_class = ChapterSerializer

    def create(self, request, *args, **kwargs):
        course_id = self.kwargs.get('courseId')
        try:
            course = Course.objects.get(pk=course_id)
        except Course.DoesNotExist:
            return Response({'error': 'Course does not exist'}, status=status.HTTP_404_NOT_FOUND)
        
        chapters_data = request.data.get('chapters', [])
        serialized_chapters = []
        
        for chapter_data in chapters_data:
            chapter_data['course'] = course_id
            serializer = self.get_serializer(data=chapter_data)
            serializer.is_valid(raise_exception=True)
            serialized_chapters.append(serializer.save())
        return Response(ChapterSerializer(serialized_chapters, many=True).data, status=status.HTTP_201_CREATED)
    
class NotesCreateAPIView(generics.CreateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

    def create(self, request, *args, **kwargs):
        course_id = self.kwargs.get('courseId')
        try:
            course = Course.objects.get(pk=course_id)
        except Course.DoesNotExist:
            return Response({'error': 'Course does not exist'}, status=status.HTTP_404_NOT_FOUND)
        
        notes_data = request.data.get('notes', [])
        serialized_notes = []
        
        for note_data in notes_data:
            note_data['course'] = course_id
            serializer = self.get_serializer(data=note_data)
            try:
                serializer.is_valid(raise_exception=True)
            except serializers.ValidationError as e:
                print("Validation error:", e.detail)  # Print the validation error
                return Response({'error': 'Validation error', 'details': e.detail}, status=status.HTTP_400_BAD_REQUEST)
            serialized_notes.append(serializer.save())
        
        return Response(NoteSerializer(serialized_notes, many=True).data, status=status.HTTP_201_CREATED)

class ChapterListAPIView(generics.ListAPIView):
    serializer_class = ChapterSerializer

    def get_queryset(self):
        course_id = self.kwargs.get('courseId')
        return Chapter.objects.filter(course_id=course_id)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        course_id = self.kwargs.get('courseId')
        course = Course.objects.filter(id=course_id).first()
        if not course:
            return Response({'error': 'Course does not exist'}, status=status.HTTP_404_NOT_FOUND)
        course_serializer = CourseSerializer(course)
        chapter_serializer = self.get_serializer(queryset, many=True)
        return Response({'course': course_serializer.data, 'chapters': chapter_serializer.data}, status=status.HTTP_200_OK)

class CourseEnroll(APIView):
    def post(self, request):
        serializer = CourseEnrollSerializer(data=request.data)
        if serializer.is_valid():
            course_id = serializer.validated_data['courseId']
            try:
                course = Course.objects.get(pk=course_id)
                if request.user.is_authenticated:
                    course.enrolled_users.add(request.user)
                    return Response({'message': 'User enrolled in the course successfully.'}, status=status.HTTP_200_OK)
                else:
                    return Response({'error': 'User is not authenticated.'}, status=status.HTTP_401_UNAUTHORIZED)
            except Course.DoesNotExist:
                return Response({'error': 'Course not found.'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CourseEnrollList(generics.ListAPIView):
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return user.enrolled_courses.all()
