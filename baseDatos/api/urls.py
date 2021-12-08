from django.urls import path
from .views import StudentView, EducatorView, AdminView, TaskView, AssignedTaskView, StockTaskView, AssignedStudentView, ClassMenuView, DinningTaskView

urlpatterns = [
    path('api/v1/students/', StudentView.as_view()),
    path('api/v1/students/<int:idStudent>/', StudentView.as_view()),
    path('api/v1/educators/', EducatorView.as_view()),
    path('api/v1/educators/<int:idEducator>/', EducatorView.as_view()),
    path('api/v1/admins/', AdminView.as_view()),
    path('api/v1/tasks/', TaskView.as_view()),
    path('api/v1/tasks/<int:idTask>/', TaskView.as_view()),
    path('api/v1/assignedTasks/', AssignedTaskView.as_view()),
    path('api/v1/stockTasks/', StockTaskView.as_view()),
    path('api/v1/assignedStudents/', AssignedStudentView.as_view()),
    path('api/v1/classMenus/', ClassMenuView.as_view()),
    path('api/v1/dinningTasks/', DinningTaskView.as_view()),
]