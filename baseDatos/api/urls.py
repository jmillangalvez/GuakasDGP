from django.urls import path
from .views import StudentView, EducatorView, AdminView, TaskView, AssignedView

urlpatterns = [
    path('api/students/', StudentView.as_view()),
    path('educators/', EducatorView.as_view()),
    path('admins/', AdminView.as_view()),
    path('tasks/', TaskView.as_view()),
    path('assigneds/', AssignedView.as_view()),
]