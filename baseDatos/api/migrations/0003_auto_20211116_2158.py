# Generated by Django 3.2.8 on 2021-11-16 21:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_assigned'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='assigned',
            name='id',
        ),
        migrations.RemoveField(
            model_name='assigned',
            name='student',
        ),
        migrations.RemoveField(
            model_name='assigned',
            name='task',
        ),
        migrations.AddField(
            model_name='assigned',
            name='assignedId',
            field=models.AutoField(default=-1, primary_key=True, serialize=False),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='assigned',
            name='studentId',
            field=models.IntegerField(default=-1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='assigned',
            name='taskId',
            field=models.IntegerField(default=-1),
            preserve_default=False,
        ),
    ]