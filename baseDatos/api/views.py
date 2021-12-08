from django.views import View
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Student, Educator, Admin, Task, AssignedTask, StockTask, AssignedStudent, ClassMenu, DinningTask

@method_decorator(csrf_exempt, name='dispatch')
class StudentView(View):
    def post(self, request):

        data = json.loads(request.body.decode("utf-8"))
        s_id = data.get('idStudent')
        s_name = data.get('name')
        s_accessibilityType = data.get('accessibilityType')
        s_picture = data.get('picture')

        student_data = {
            'idStudent': s_id,
            'name': s_name,
            'accessibilityType': s_accessibilityType,
            'picture': s_picture,
        }

        student_item = Student.objects.create(**student_data)

        data = {
            "message": f"New student added with id: {student_item.idStudent}"
        }

        return JsonResponse(data, status=201)
    
    def get(self, request):
        items_count = Student.objects.count()
        items = Student.objects.all()

        items_data = []
        for item in items:
            items_data.append({
                'idStudent': item.idStudent,
                'name': item.name,
                'accessibilityType': item.accessibilityType,
                'picture': item.picture,
            })

        data = {
            'items': items_data,
            'count': items_count,
        }

        return JsonResponse(data)
    
    def put(self, request, idStudent):
        data = json.loads(request.body.decode("utf-8"))
        s_name = data.get('name')
        s_accessibilityType = data.get('accessibilityType')
        s_picture = data.get('picture')
        
        Student.objects.filter(idStudent=idStudent).update(
            name=s_name,
            accessibilityType=s_accessibilityType,
            picture=s_picture,
        )

        mess = {
            "message": "Student updated"
        }

        return JsonResponse(mess)
    
    def delete(self, request, idStudent):
        Student.objects.filter(idStudent=idStudent).delete()
        
        data = {
            "message": "Student deleted"
        }

        return JsonResponse(data)

@method_decorator(csrf_exempt, name='dispatch')
class EducatorView(View):
    def post(self, request):

        data = json.loads(request.body.decode("utf-8"))
        e_id = data.get('idEducator')
        e_name = data.get('name')
        e_email = data.get('email')
        e_password = data.get('password')
        e_picture = data.get('picture')

        educator_data = {
            'idEducator': e_id,
            'name': e_name,
            'email': e_email,
            'password': e_password,
            'picture': e_picture,
        }

        educator_item = Educator.objects.create(**educator_data)

        data = {
            "message": f"New educator added with id: {educator_item.idEducator}"
        }

        return JsonResponse(data, status=201)
    
    def get(self, request):
        items_count = Educator.objects.count()
        items = Educator.objects.all()

        items_data = []
        for item in items:
            items_data.append({
                'idEducator': item.idEducator,
                'name': item.name,
                'email': item.email,
                'password': item.password,
                'picture': item.picture,
            })

        data = {
            'items': items_data,
            'count': items_count,
        }

        return JsonResponse(data)
    
    def put(self, request, idEducator):
        data = json.loads(request.body.decode("utf-8"))
        e_name = data.get('name')
        e_email = data.get('email')
        e_password = data.get('password')
        e_picture = data.get('picture')
        
        Educator.objects.filter(idEducator=idEducator).update(
            name=e_name,
            email=e_email,
            password=e_password,
            picture=e_picture,
        )

        mess = {
            "message": "Educator updated"
        }

        return JsonResponse(mess)
    
    def delete(self, request, idEducator):
        Educator.objects.filter(idEducator=idEducator).delete()
        
        data = {
            "message": "Educator deleted"
        }

        return JsonResponse(data)

@method_decorator(csrf_exempt, name='dispatch')
class AdminView(View):
    def post(self, request):

        data = json.loads(request.body.decode("utf-8"))
        a_id = data.get('idAdmin')
        a_name = data.get('name')
        a_email = data.get('email')
        a_password = data.get('password')

        admin_data = {
            'idAdmin': a_id,
            'name': a_name,
            'email': a_email,
            'password': a_password,
        }

        admin_item = Admin.objects.create(**admin_data)

        data = {
            "message": f"New admin added with id: {admin_item.idAdmin}"
        }

        return JsonResponse(data, status=201)
    
    def get(self, request):
        items_count = Admin.objects.count()
        items = Admin.objects.all()

        items_data = []
        for item in items:
            items_data.append({
                'idAdmin': item.idAdmin,
                'name': item.name,
                'email': item.email,
                'password': item.password,
            })

        data = {
            'items': items_data,
            'count': items_count,
        }

        return JsonResponse(data)
    
    def put(self, request, idAdmin):
        data = json.loads(request.body.decode("utf-8"))
        a_name = data.get('name')
        a_email = data.get('email')
        a_password = data.get('password')
        
        Admin.objects.filter(idAdmin=idAdmin).update(
            name=a_name,
            email=a_email,
            password=a_password,
        )

        mess = {
            "message": "Admin updated"
        }

        return JsonResponse(mess)
    
    def delete(self, request, idAdmin):
        Admin.objects.filter(idAdmin=idAdmin).delete()
        
        data = {
            "message": "Admin deleted"
        }

        return JsonResponse(data)

@method_decorator(csrf_exempt, name='dispatch')
class TaskView(View):
    def post(self, request):

        data = json.loads(request.body.decode("utf-8"))
        t_id = data.get('idTask')
        t_title = data.get('title')
        t_pictogramTitle = data.get('pictogramTitle')
        t_description = data.get('description')
        t_pictogramDescription = data.get('pictogramDescription')

        task_data = {
            'idTask': t_id,
            'title': t_title,
            'pictogramTitle': t_pictogramTitle,
            'description': t_description,
            'pictogramDescription': t_pictogramDescription,
        }

        task_item = Task.objects.create(**task_data)

        data = {
            "message": f"New task added with id: {task_item.idTask}"
        }
        return JsonResponse(data, status=201)
    
    def get(self, request):
        items_count = Task.objects.count()
        items = Task.objects.all()

        items_data = []
        for item in items:
            items_data.append({
                'idTask': item.idTask,
                'title': item.title,
                'pictogramTitle': item.pictogramTitle,
                'description': item.description,
                'pictogramDescription': item.pictogramDescription,
            })

        data = {
            'items': items_data,
            'count': items_count,
        }

        return JsonResponse(data)
    
    def put(self, request, idTask):
        data = json.loads(request.body.decode("utf-8"))
        t_title = data.get('title')
        t_pictogramTitle = data.get('pictogramTitle')
        t_description = data.get('description')
        t_pictogramDescription = data.get('pictogramDescription')
        
        Task.objects.filter(idTask=idTask).update(
            name=t_title,
            pictogramTitle=t_pictogramTitle,
            description=t_description,
            pictogramDescription=t_pictogramDescription,
        )

        mess = {
            "message": "Task updated"
        }

        return JsonResponse(mess)
    
    def delete(self, request, idTask):
        Task.objects.filter(idTask=idTask).delete()
        
        data = {
            "message": "Task deleted"
        }

        return JsonResponse(data)

@method_decorator(csrf_exempt, name='dispatch')
class AssignedTaskView(View):
    def post(self, request):

        data = json.loads(request.body.decode("utf-8"))
        a_id = data.get('idAssignedTask')
        a_student = data.get('idStudent')
        a_task = data.get('idTask')
        a_educator = data.get('idEducator')
        a_priority = data.get('priority')
        a_assignedDate = data.get('assignedDate')
        a_completedDate = data.get('completedDate')
        a_completed = data.get('completed')

        assigned_data = {
            'idAssignedTask': a_id,
            'idStudent': a_student,
            'idTask': a_task,
            'idEducator': a_educator,
            'priority': a_priority,
            'assignedDate': a_assignedDate,
            'completedDate': a_completedDate,
            'completed': a_completed,
        }

        assigned_item = AssignedTask.objects.create(**assigned_data)

        data = {
            "message": f"New AssignedTask added with id: {assigned_item.idAssignedTask}"
        }
        return JsonResponse(data, status=201)
    
    def get(self, request):
        items_count = AssignedTask.objects.count()
        items = AssignedTask.objects.all()

        items_data = []
        for item in items:
            items_data.append({
                'idAssignedTask': item.idAssignedTask,
                'idStudent': item.idStudent,
                'idTask': item.idTask,
                'idEducator': item.idEducator,
                'priority': item.priority,
                'assignedDate': item.assignedDate,
                'completedDate': item.completedDate,
                'completed': item.completed,
            })

        data = {
            'items': items_data,
            'count': items_count,
        }

        return JsonResponse(data)
    
    def put(self, request, idAssignedTask):
        data = json.loads(request.body.decode("utf-8"))
        a_student = data.get('idStudent')
        a_task = data.get('idTask')
        a_educator = data.get('idEducator')
        a_priority = data.get('priority')
        a_assignedDate = data.get('assignedDate')
        a_completedDate = data.get('completedDate')
        a_completed = data.get('completed')
        
        AssignedTask.objects.filter(idAssignedTask=idAssignedTask).update(
            idStudent=a_student,
            idTask=a_task,
            idEducator=a_educator,
            priority=a_priority,
            assignedDate=a_assignedDate,
            completedDate=a_completedDate,
            completed=a_completed,
        )

        mess = {
            "message": "AssignedTask updated"
        }

        return JsonResponse(mess)
    
    def delete(self, request, idAssignedTask):
        AssignedTask.objects.filter(idAssignedTask=idAssignedTask).delete()
        
        data = {
            "message": "AssignedTask deleted"
        }

        return JsonResponse(data)

@method_decorator(csrf_exempt, name='dispatch')
class StockTaskView(View):
    def post(self, request):

        data = json.loads(request.body.decode("utf-8"))
        a_id = data.get('idStockTask')
        a_place = data.get('place')
        a_pictogramPlace = data.get('pictogramPlace')
        a_quantity = data.get('quantity')
        a_pictogramQuantity = data.get('pictogramQuantity')
        a_material = data.get('material')
        a_pictogramMaterial = data.get('pictogramMaterial')
        a_idStudent = data.get('idStudent')
        a_idEducator = data.get('idEducator')
        a_priority = data.get('priority')
        a_date = data.get('date')

        assigned_data = {
            'idStockTask': a_id,
            'place': a_place,
            'pictogramPlace': a_pictogramPlace,
            'quantity': a_quantity,
            'pictogramQuantity': a_pictogramQuantity,
            'material': a_material,
            'pictogramMaterial': a_pictogramMaterial,
            'idStudent': a_idStudent,
            'idEducator': a_idEducator,
            'priority': a_priority,
            'date': a_date,
        }

        assigned_item = StockTask.objects.create(**assigned_data)

        data = {
            "message": f"New StockTask added with id: {assigned_item.idStockTask}"
        }
        return JsonResponse(data, status=201)
    
    def get(self, request):
        items_count = StockTask.objects.count()
        items = StockTask.objects.all()

        items_data = []
        for item in items:
            items_data.append({
                'idStockTask': item.idStockTask,
                'place': item.place,
                'pictogramPlace': item.pictogramPlace,
                'quantity': item.quantity,
                'pictogramQuantity': item.pictogramQuantity,
                'material': item.material,
                'pictogramMaterial': item.pictogramMaterial,
                'idStudent': item.idStudent,
                'idEducator': item.idEducator,
                'priority': item.priority,
                'date': item.date,
            })

        data = {
            'items': items_data,
            'count': items_count,
        }

        return JsonResponse(data)
    
    def put(self, request, idStockTask):
        data = json.loads(request.body.decode("utf-8"))
        a_place = data.get('place')
        a_pictogramPlace = data.get('pictogramPlace')
        a_quantity = data.get('quantity')
        a_pictogramQuantity = data.get('pictogramQuantity')
        a_material = data.get('material')
        a_pictogramMaterial = data.get('pictogramMaterial')
        a_idStudent = data.get('idStudent')
        a_idEducator = data.get('idEducator')
        a_priority = data.get('priority')
        a_date = data.get('date')
        
        StockTask.objects.filter(idStockTask=idStockTask).update(
            place=a_place,
            pictogramPlace=a_pictogramPlace,
            quantity=a_quantity,
            pictogramQuantity=a_pictogramQuantity,
            material=a_material,
            pictogramMaterial=a_pictogramMaterial,
            idStudent=a_idStudent,
            idEducator=a_idEducator,
            priority=a_priority,
            date=a_date,
        )

        mess = {
            "message": "StockTask updated"
        }

        return JsonResponse(mess)
    
    def delete(self, request, idStockTask):
        StockTask.objects.filter(idStockTask=idStockTask).delete()
        
        data = {
            "message": "StockTask deleted"
        }

        return JsonResponse(data)

@method_decorator(csrf_exempt, name='dispatch')
class AssignedStudentView(View):
    def post(self, request):

        data = json.loads(request.body.decode("utf-8"))
        a_id = data.get('idAssignedStudent')
        a_idEducator = data.get('idEducator')
        a_idStudent = data.get('idStudent')

        assigned_data = {
            'idAssignedStudent': a_id,
            'idEducator': a_idEducator,
            'idStudent': a_idStudent,
        }

        assigned_item = AssignedStudent.objects.create(**assigned_data)

        data = {
            "message": f"New AssignedStudent added with id: {assigned_item.idAssignedStudent}"
        }
        return JsonResponse(data, status=201)
    
    def get(self, request):
        items_count = AssignedStudent.objects.count()
        items = AssignedStudent.objects.all()

        items_data = []
        for item in items:
            items_data.append({
                'idAssignedStudent': item.idAssignedStudent,
                'idEducator': item.idEducator,
                'idStudent': item.idStudent,
            })

        data = {
            'items': items_data,
            'count': items_count,
        }

        return JsonResponse(data)
    
    def put(self, request, idAssignedStudent):
        data = json.loads(request.body.decode("utf-8"))
        a_idEducator = data.get('idEducator')
        a_idStudent = data.get('idStudent')
        
        AssignedStudent.objects.filter(idAssignedStudent=idAssignedStudent).update(
            idEducator=a_idEducator,
            idStudent=a_idStudent,
        )

        mess = {
            "message": "AssignedStudent updated"
        }

        return JsonResponse(mess)
    
    def delete(self, request, idAssignedStudent):
        AssignedStudent.objects.filter(idAssignedStudent=idAssignedStudent).delete()
        
        data = {
            "message": "AssignedStudent deleted"
        }

        return JsonResponse(data)

@method_decorator(csrf_exempt, name='dispatch')
class ClassMenuView(View):
    def post(self, request):

        data = json.loads(request.body.decode("utf-8"))
        a_idClassMenu = data.get('idClassMenu')
        a_idEducator = data.get('idEducator')
        a_date = data.get('date')
        a_numNormalMenu = data.get('numNormalMenu')
        a_numNoMeatMenu = data.get('numNoMeatMenu')
        a_numCrushedMenu = data.get('numCrushedMenu')
        a_numDessertCrushedFruit = data.get('numDessertCrushedFruit')
        a_numDessertYogurtCustard = data.get('numDessertYogurtCustard')
        a_numDessertFruit = data.get('numDessertFruit')

        assigned_data = {
            'idClassMenu': a_idClassMenu,
            'idEducator': a_idEducator,
            'date': a_date,
            'numNormalMenu': a_numNormalMenu,
            'numNoMeatMenu': a_numNoMeatMenu,
            'numCrushedMenu': a_numCrushedMenu,
            'numDessertCrushedFruit': a_numDessertCrushedFruit,
            'numDessertYogurtCustard': a_numDessertYogurtCustard,
            'numDessertFruit': a_numDessertFruit,
        }

        assigned_item = ClassMenu.objects.create(**assigned_data)

        data = {
            "message": f"New ClassMenu added with id: {assigned_item.idClassMenu}, {assigned_item.idEducator}"
        }
        return JsonResponse(data, status=201)
    
    def get(self, request):
        items_count = ClassMenu.objects.count()
        items = ClassMenu.objects.all()

        items_data = []
        for item in items:
            items_data.append({
                'idClassMenu': item.idClassMenu,
                'idEducator': item.idEducator,
                'date': item.idDate,
                'numNormalMenu': item.idNormalMenu,
                'numNoMeatMenu': item.idNoMeatMenu,
                'numCrushedMenu': item.idCrushedMenu,
                'numDessertCrushedFruit': item.idDessertCrushedFruit,
                'numDessertYogurtCustard': item.idDessertYogurtCustard,
                'numDessertFruit': item.idDessertFruit,
            })

        data = {
            'items': items_data,
            'count': items_count,
        }

        return JsonResponse(data)
    
    def put(self, request, idClassMenu):
        data = json.loads(request.body.decode("utf-8"))
        a_idEducator = data.get('idEducator')
        a_date = data.get('date')
        a_numNormalMenu = data.get('numNormalMenu')
        a_numNoMeatMenu = data.get('numNoMeatMenu')
        a_numCrushedMenu = data.get('numCrushedMenu')
        a_numDessertCrushedFruit = data.get('numDessertCrushedFruit')
        a_numDessertYogurtCustard = data.get('numDessertYogurtCustard')
        a_numDessertFruit = data.get('numDessertFruit')
        
        ClassMenu.objects.filter(idClassMenu=idClassMenu).update(
            idEducator = a_idEducator,
            date = a_date,
            numNormalMenu = a_numNormalMenu,
            numNoMeatMenu = a_numNoMeatMenu,
            numCrushedMenu = a_numCrushedMenu,
            numDessertCrushedFruit = a_numDessertCrushedFruit,
            numDessertYogurtCustard = a_numDessertYogurtCustard,
            numDessertFruit = a_numDessertFruit,
        )

        mess = {
            "message": "ClassMenu updated"
        }

        return JsonResponse(mess)
    
    def delete(self, request, idClassMenu):
        ClassMenu.objects.filter(idClassMenu=idClassMenu).delete()
        
        data = {
            "message": "ClassMenu deleted"
        }

        return JsonResponse(data)

@method_decorator(csrf_exempt, name='dispatch')
class DinningTaskView(View):
    def post(self, request):

        data = json.loads(request.body.decode("utf-8"))
        a_id = data.get('idDinningTask')
        a_classes = data.get('classes')
        a_menus = data.get('menus')

        assigned_data = {
            'idDinningTask': a_id,
            'classes': a_classes,
            'menus': a_menus,
        }

        assigned_item = DinningTask.objects.create(**assigned_data)

        data = {
            "message": f"New DinningTask added with id: {assigned_item.idDinningTask}"
        }
        return JsonResponse(data, status=201)
    
    def get(self, request):
        items_count = DinningTask.objects.count()
        items = DinningTask.objects.all()

        items_data = []
        for item in items:
            items_data.append({
                'idDinningTask': item.idDinningTask,
                'classes': item.classes,
                'menus': item.menus,
            })

        data = {
            'items': items_data,
            'count': items_count,
        }

        return JsonResponse(data)
    
    def put(self, request, idDinningTask):
        data = json.loads(request.body.decode("utf-8"))
        a_classes = data.get('classes')
        a_menus = data.get('menus')

        
        DinningTask.objects.filter(idDinningTask=idDinningTask).update(
            classes=a_classes,
            menus=a_menus,
        )

        mess = {
            "message": "DinningTask updated"
        }

        return JsonResponse(mess)
    
    def delete(self, request, idDinningTask):
        DinningTask.objects.filter(idDinningTask=idDinningTask).delete()
        
        data = {
            "message": "DinningTask deleted"
        }

        return JsonResponse(data)