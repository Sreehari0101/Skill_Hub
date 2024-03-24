from rest_framework import serializers
from .models import Course, Chapter

class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapter
        fields = ['id','course', 'title', 'video_url']

class CourseSerializer(serializers.ModelSerializer):
    chapters = ChapterSerializer(many=True, required=False) 

    class Meta:
        model = Course
        fields = ['id', 'title', 'description', 'cover_photo', 'chapters']

    def create(self, validated_data):
        chapters_data = validated_data.pop('chapters', [])  # Extract chapters data from validated data
        course = Course.objects.create(**validated_data)  # Create course instance

        for chapter_data in chapters_data:
            Chapter.objects.create(course=course, **chapter_data)  # Create chapter instances and associate with course

        return course
