from rest_framework import serializers
from .models import Course, Chapter, Note
from accounts.models import MentorProfile

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id','course', 'title', 'file_url']

class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapter
        fields = ['id','course', 'title', 'video_url']

class CourseSerializer(serializers.ModelSerializer):
    chapters = ChapterSerializer(many=True, required=False) 
    mentor_full_name = serializers.SerializerMethodField()
    class Meta:
        model = Course
        fields = ['id', 'title', 'description', 'cover_photo', 'chapters','mentor_full_name']

    def get_mentor_full_name(self, obj):
        mentor = obj.mentor
        if mentor:
            mentor_profile = MentorProfile.objects.get(user=mentor)
            return mentor_profile.full_name
        return None
    
    def create(self, validated_data):
        chapters_data = validated_data.pop('chapters', [])  
        course = Course.objects.create(**validated_data) 

        for chapter_data in chapters_data:
            Chapter.objects.create(course=course, **chapter_data)  

        return course

class CourseEnrollSerializer(serializers.Serializer):
    courseId = serializers.IntegerField()
