
from rest_framework import generics, permissions
from .models import Project,Task
from .serializers import ProjectSerializer,TaskSerializer

class ProjectListCreateView(generics.ListCreateAPIView):

    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class TaskListCreateView(generics.ListCreateAPIView):

    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(assigned_to=self.request.user)


class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):

    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]