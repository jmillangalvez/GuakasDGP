from django.db import models

# Create your models here.

class Student(models.Model):
    idStudent = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, default='test')
    accessibilityType = models.IntegerField()
    picture = models.CharField(max_length=100, default='test')

class Task(models.Model):
    idTask = models.AutoField(primary_key=True)
    title = models.CharField(max_length=50, default='test')
    pictogramTitle = models.CharField(max_length=100, default='test')
    description = models.CharField(max_length=250, default='test')
    pictogramDescription = models.CharField(max_length=100, default='test')

class DinningTask(models.Model):
    idDinningTask = models.AutoField(primary_key=True)
    idStudent = models.IntegerField()
    date = models.DateField()

class StockTask(models.Model):
    idStockTask = models.AutoField(primary_key=True)
    place = models.CharField(max_length=50, default='test')
    pictogramPlace = models.CharField(max_length=100, default='test')
    quantity = models.IntegerField()
    pictogramQuantity = models.CharField(max_length=100, default='test')
    material = models.CharField(max_length=50, default='test')
    pictogramMaterial = models.CharField(max_length=100, default='test')
    idStudent = models.IntegerField()
    idEducator = models.IntegerField()
    priority = models.IntegerField()
    date = models.DateField()

class AssignedTask(models.Model):
    idAssignedTask = models.AutoField(primary_key=True)
    idTask = models.IntegerField()
    idStudent = models.IntegerField()
    idEducator = models.IntegerField()
    priority = models.IntegerField()
    assignedDate = models.DateField()
    completedDate = models.DateField()
    completed = models.IntegerField()

class Admin(models.Model):
    idAdmin = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, default='test')
    email = models.CharField(max_length=50, default='test')
    password = models.CharField(max_length=20, default='test')

class Educator(models.Model):
    idEducator = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, default='test')
    email = models.CharField(max_length=50, default='test')
    password = models.CharField(max_length=20, default='test')
    picture = models.CharField(max_length=100, default='test')

class AssignedStudent(models.Model):
    idAssignedStudent = models.AutoField(primary_key=True)
    idEducator = models.IntegerField()
    idStudent = models.IntegerField()

class ClassMenu(models.Model):
    idClassMenu = models.AutoField(primary_key=True)
    idEducator = models.IntegerField()
    date = models.DateField()
    numNormalMenu = models.IntegerField()
    numNoMeatMenu = models.IntegerField()
    numCrushedMenu = models.IntegerField()
    numDessertFruit = models.IntegerField()
    numDessertCrushedFruit = models.IntegerField()
    numDessertYogurtCustard = models.IntegerField()