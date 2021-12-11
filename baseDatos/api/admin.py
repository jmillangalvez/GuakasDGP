from django.contrib import admin
from .models import Student, Educator, Admin, Task, AssignedTask, StockTask, AssignedStudent, ClassMenu, DinningTask

# Register your models here.
admin.site.register(Student)
admin.site.register(Educator)
admin.site.register(Admin)
admin.site.register(Task)
admin.site.register(AssignedTask)
admin.site.register(StockTask)
admin.site.register(AssignedStudent)
admin.site.register(ClassMenu)
admin.site.register(DinningTask)

