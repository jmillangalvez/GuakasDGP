from django.contrib import admin
from .models import Student, Educator, Admin, Task

# Register your models here.
admin.site.register(Student)
admin.site.register(Educator)
admin.site.register(Admin)
admin.site.register(Task)

