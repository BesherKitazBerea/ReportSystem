from django.db import models

# Create your models here.
class Report(models.Model):
    id = models.AutoField(primary_key=True)
    lat = models.FloatField()
    lng = models.FloatField()
    date = models.DateTimeField(auto_now_add=True)
    address = models.CharField(max_length=100)
    description = models.TextField(max_length=1000)