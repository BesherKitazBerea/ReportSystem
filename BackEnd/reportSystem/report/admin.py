from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Report

@admin.register(Report)
class MyModelAdmin(admin.ModelAdmin):
    list_display = ('id', 'lat', 'lng', 'date', 'address', 'description')
