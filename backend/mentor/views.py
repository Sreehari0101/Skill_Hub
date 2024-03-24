from rest_framework import generics, status, serializers
from rest_framework.response import Response
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
class CourseRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

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
        
        # Iterate over each chapter data
        for chapter_data in chapters_data:
            # Populate the course field with the retrieved course object
            chapter_data['course'] = course_id
            
            # Serialize and save the chapter
            serializer = self.get_serializer(data=chapter_data)
            serializer.is_valid(raise_exception=True)
            serialized_chapters.append(serializer.save())
        
        # Return the serialized data of the created chapters
        return Response(ChapterSerializer(serialized_chapters, many=True).data, status=status.HTTP_201_CREATED)