from rest_framework import serializers
from .models import CourseProgress, ChapterProgress

class CourseProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseProgress
        fields = '__all__'

class ChapterProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChapterProgress
        fields = '__all__'