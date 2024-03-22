from django.shortcuts import render
from django.http import JsonResponse
import json
from django.views.decorators.http import require_http_methods
from common.json import ModelEncoder
from .models import Technician, Appointment

# Encoders
class TechnicianEncoder(ModelEncoder):
  model = Technician
  properties = [
    "first_name",
    "last_name",
    "employee_id",
    "id",
  ]

class AppointmentEncoder(ModelEncoder):
  model = Appointment
  properties = [
    "date_time",
    "reason",
    "vin",
    "status",
    "customer",
    "technician",
    "id",
  ]
  encoders = {
    "technician": TechnicianEncoder(),
  }

# List/Create Technician
@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
  if request.method == "GET":
    technicians = Technician.objects.all()
    return JsonResponse(
    {"technicians": technicians},
    encoder=TechnicianEncoder,
  )
  else:
    content = json.loads(request.body)
    technician = Technician.objects.create(**content)
    return JsonResponse(
      technician,
      encoder=TechnicianEncoder,
      safe=False,
    )

# Detail/Delete Technician
@require_http_methods(["GET", "DELETE"])
def api_detail_technician(request, id):
  if request.method == "GET":
    technician = technician.objects.get(id=id)
    return JsonResponse(
      technician,
      encoder=TechnicianEncoder,
      safe=False,
    )
  else:
    count, _ = Technician.objects.filter(id=id).delete()
    return JsonResponse({"deleted": count > 0})

# List/Create Appointment
@require_http_methods(["GET", "POST"])
def api_list_appointments(request, technician_id=None):
  if request.method == "GET":
    if technician_id is not None:
      appointments = Appointment.objects.filter(technician=technician_id)
    else:
      appointments = Appointment.objects.all()
    return JsonResponse(
      {"appointments": appointments},
      encoder=AppointmentEncoder,
    )
  else:
    content = json.loads(request.body)
    try:
      technician_id = content["technician"]
      technician = Technician.objects.get(id=technician_id)
      content["technician"] = technician
    except Technician.DoesNotExist:
      return JsonResponse(
        {"message": "Invalid employee id"},
        status=400
      )
    appointment = Appointment.objects.create(**content)
    return JsonResponse(
      appointment,
      encoder=AppointmentEncoder,
      safe=False,
    )

# Detail/Delete Appointment
@require_http_methods(["GET", "DELETE"])
def api_detail_appointment(request, id):
  if request.method == "GET":
    appointment = Appointment.objects.get(id=id)
    return JsonResponse(
      appointment,
      encoder=AppointmentEncoder,
      safe=False,
    )
  else:
    count, _ = Appointment.objects.filter(id=id).delete()
    return JsonResponse({"deleted": count > 0})

# Cancel appointment
def api_cancel_appointment(request, id):
  try:
      appointment = Appointment.objects.get(id=id)
  except Appointment.DoesNotExist:
      return JsonResponse({"error": "Appointment not found"}, status=404)

  appointment.status = "cancelled"
  appointment.save()

  return JsonResponse(
      appointment,
      encoder=AppointmentEncoder,
      safe=False,
      )

# Finish appointment
def api_finish_appointment(request, id):
  try:
      appointment = Appointment.objects.get(id=id)
  except Appointment.DoesNotExist:
      return JsonResponse({"error": "Appointment not found"}, status=404)

  appointment.status = "finished"
  appointment.save()

  return JsonResponse(
      appointment,
      encoder=AppointmentEncoder,
      safe=False,
      )
