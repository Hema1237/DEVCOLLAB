from rest_framework import serializers
from .models import Project,Task

class ProjectSerializer(serializers.ModelSerializer):

    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Project
        fields = '__all__'

class TaskSerializer(serializers.ModelSerializer):

    assigned_to = serializers.ReadOnlyField(
        source='assigned_to.username'
    )

    class Meta:
        model = Task
        fields = '__all__'