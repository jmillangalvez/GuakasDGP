from django.views import View
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Student, Educator, Admin, Task, Assigned

@method_decorator(csrf_exempt, name='dispatch')
class StudentView(View):
    def post(self, request):

        data = json.loads(request.body.decode("utf-8"))
        s_id = data.get('studentId')
        s_name = data.get('name')
        s_accesibilityType = data.get('accesibilityType')

        student_data = {
            'studentId': s_id,
            'name': s_name,
            'accesibilityType': s_accesibilityType,
        }

        student_item = Student.objects.create(**student_data)

        data = {
            "message": f"New item added to Cart with id: {student_item.studentId}"
        }

        return JsonResponse(data, status=201)
    
    def get(self, request):
        items_count = Student.objects.count()
        items = Student.objects.all()

        items_data = []
        for item in items:
            items_data.append({
                'studentId': item.studentId,
                'name': item.name,
                'accesibilityType': item.accesibilityType,
            })

        data = {
            'items': items_data,
            'count': items_count,
        }

        return JsonResponse(data)

@method_decorator(csrf_exempt, name='dispatch')
class EducatorView(View):
    def post(self, request):

        data = json.loads(request.body.decode("utf-8"))
        e_id = data.get('educatorId')
        e_name = data.get('name')
        e_userName = data.get('userName')
        e_password = data.get('password')

        educator_data = {
            'educatorId': e_id,
            'name': e_name,
            'userName': e_userName,
            'password': e_password,
        }

        educator_item = Educator.objects.create(**educator_data)

        data = {
            "message": f"New item added to Cart with id: {educator_item.educatorId}"
        }

        return JsonResponse(data, status=201)
    
    def get(self, request):
        items_count = Educator.objects.count()
        items = Educator.objects.all()

        items_data = []
        for item in items:
            items_data.append({
                'educatorId': item.educatorId,
                'name': item.name,
                'userName': item.userName,
                'password': item.password,
            })

        data = {
            'items': items_data,
            'count': items_count,
        }

        return JsonResponse(data)

@method_decorator(csrf_exempt, name='dispatch')
class AdminView(View):
    def post(self, request):

        data = json.loads(request.body.decode("utf-8"))
        a_id = data.get('adminId')
        a_name = data.get('name')
        a_userName = data.get('userName')
        a_password = data.get('password')

        admin_data = {
            'adminId': a_id,
            'name': a_name,
            'userName': a_userName,
            'password': a_password,
        }

        admin_item = Admin.objects.create(**admin_data)

        data = {
            "message": f"New item added to Cart with id: {admin_item.adminId}"
        }

        return JsonResponse(data, status=201)
    
    def get(self, request):
        items_count = Admin.objects.count()
        items = Admin.objects.all()

        items_data = []
        for item in items:
            items_data.append({
                'adminId': item.adminId,
                'name': item.name,
                'userName': item.userName,
                'password': item.password,
            })

        data = {
            'items': items_data,
            'count': items_count,
        }

        return JsonResponse(data)

@method_decorator(csrf_exempt, name='dispatch')
class TaskView(View):
    def post(self, request):

        data = json.loads(request.body.decode("utf-8"))
        t_id = data.get('taskId')
        t_title = data.get('title')
        t_description = data.get('description')
        t_finished = data.get('finished')
        t_taskDate = data.get('taskDate')

        task_data = {
            'taskId': t_id,
            'title': t_title,
            'description': t_description,
            'finished': t_finished,
            'taskDate': t_taskDate,
        }

        task_item = Task.objects.create(**task_data)

        data = {
            "message": f"New item added to Cart with id: {task_item.taskId}"
        }
        return JsonResponse(data, status=201)
    
    def put(self, request, taskId):
        data = json.loads(request.body.decode("utf-8"))
        t_id = data.get('taskId')
        t_title = data.get('title')
        t_description = data.get('description')
        t_finished = data.get('finished')
        t_taskDate = data.get('taskDate')
        
        Task.objects.filter(taskId=taskId).update(
            title=t_title,
            description=t_description,
            finished=t_finished,
            taskDate=t_taskDate
        )
        mess = {
            "message": "New item added to Cart"
        }
        return JsonResponse(mess) 
           
    def get(self, request, taskId=-1):
        items_count = Task.objects.count()
        items = Task.objects.all()

        items_data = []
        for item in items:
            items_data.append({
                'taskId': item.taskId,
                'title': item.title,
                'description': item.description,
                'finished': item.finished,
                'taskDate': item.taskDate,
            })

        if taskId==-1:
            data = {
                'items': items_data,
                'count': items_count,
            }
        else:
            data = {
                'item': items_data[taskId]
            }

        return JsonResponse(data)

    def delete(self, request, taskId):
        Task.objects.filter(taskId=taskId).delete()
        
        data = {
            "message": "Task item deleted"
        }
        return JsonResponse(data)

@method_decorator(csrf_exempt, name='dispatch')
class AssignedView(View):
    def post(self, request):

        data = json.loads(request.body.decode("utf-8"))
        a_student = data.get('studentId')
        a_task = data.get('taskId')

        assigned_data = {
            'studentId': a_student,
            'taskId': a_task,
        }

        assigned_item = Assigned.objects.create(**assigned_data)

        data = {
            "message": f"New item added to Cart with id: {assigned_item.studentId}"
        }
        return JsonResponse(data, status=201)
    
    def get(self, request):
        items_count = Assigned.objects.count()
        items = Assigned.objects.all()

        items_data = []
        for item in items:
            items_data.append({
                'studentId': item.studentId,
                'taskId': item.taskId,
            })

        data = {
            'items': items_data,
            'count': items_count,
        }

        return JsonResponse(data)