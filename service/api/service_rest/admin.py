from django.contrib import admin
from .models import Technician, Appointment
# Register your models here.
@admin.register(Technician)
class TechnicianAdmin(admin.ModelAdmin):
  list_display = [
    "first_name",
    "last_name",
    "employee_id",
    "id",
  ]

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
  list_display = [
    "date_time",
    "reason",
    "vin",
    "status",
    "customer",
    "technician",
    "id",
  ]
