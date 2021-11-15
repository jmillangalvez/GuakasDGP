from django.db import models

# Create your models here.

class Student(models.Model):
    studentId = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    accesibilityType = models.IntegerField()

class Educator(models.Model):
    educatorId = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    userName = models.CharField(max_length=20)
    password = models.CharField(max_length=20)

class Admin(models.Model):
    adminId = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    userName = models.CharField(max_length=20)
    password = models.CharField(max_length=20)

class Task(models.Model):
    taskId = models.AutoField(primary_key=True)
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=250)
    finished = models.IntegerField()
    taskDate = models.DateField()
