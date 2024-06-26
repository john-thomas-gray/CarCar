from tkinter import CASCADE
from django.db import models
from django.urls import reverse




class AutomobileVO(models.Model):
    sold = models.BooleanField(default=False)
    vin = models.CharField(max_length=17)




class Salesperson(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    employee_id = models.CharField(max_length=200)

    def get_api_url(self):
        return reverse("api_show_salesperson", kwargs={"pk": self.pk})

    def __str__(self):
        return self.name




class Customer(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=12)

    def get_api_url(self):
        return reverse("api_show_customer", kwargs={"pk": self.pk})

    def __str__(self):
        return self.name




class Sale(models.Model):
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="autos",
        on_delete=models.CASCADE,
    )
    salesperson = models.ForeignKey(
        Salesperson,
        related_name="salesperson",
        on_delete=models.CASCADE,
    )
    customer = models.ForeignKey(
        Customer,
        related_name="customer",
        on_delete=models.CASCADE,
    )
    price = models.CharField(max_length=20)

    def get_api_url(self):
        return reverse("api_show_sale", kwargs={"pk": self.pk})

    def __str__(self):
        return self.name
