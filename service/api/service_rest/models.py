from django.db import models

# Create your models here.
class AutomobileVO(models.Model):
  import_href = models.CharField(max_length=200)
  color = models.CharField(max_length=50)
  year = models.PositiveSmallIntegerField()
  vin = models.CharField(max_length=17)
  sold = models.BooleanField(default=False)



class Technician(models.Model):
  first_name = models.CharField(max_length=50)
  last_name = models.CharField(max_length=50)
  employee_id = models.CharField(max_length=25, unique=True)

class Appointment(models.Model):
  date_time = models.DateTimeField(auto_now_add=True, blank=True)
  reason = models.TextField()
  vin = models.CharField(max_length=17)
  status = models.CharField(max_length=10, default="scheduled")
  customer = models.CharField(max_length=50)
  technician = models.ForeignKey(
    Technician,
    related_name="appointments",
    on_delete=models.PROTECT,
  )
