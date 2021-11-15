from django.urls import path
from .views import StudentView, EducatorView, AdminView, TaskView

urlpatterns = [
    path('students/', StudentView.as_view()),
    path('educators/', EducatorView.as_view()),
    path('admins/', AdminView.as_view()),
    path('tasks/', TaskView.as_view()),
]