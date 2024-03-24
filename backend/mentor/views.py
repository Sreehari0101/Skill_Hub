from rest_framework import generics, status, serializers
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Course, Chapter
from .serializers import CourseSerializer, ChapterSerializer

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
            return Course.objects.all()


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