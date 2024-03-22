from django.urls import path
from .views import(
    api_list_salesperson,
    api_show_salesperson,
    api_list_customer,
    api_show_customer,
    api_list_sale,
    api_show_sale
)

urlpatterns = [
    path('salesperson/', api_list_salesperson, name='api_list_salesperson'),
    path('salesperson/<int:pk>/', api_show_salesperson, name='api_show_salesperson'),
    path('customer/', api_list_customer, name='api_list_customer'),
    path('customer/<int:pk>/', api_show_customer, name='api_show_customer'),
    path('sale/', api_list_sale, name= 'api_list_sale'),
    path('sale/<int:pk>/', api_show_sale, name='api_show_sale' )
]
