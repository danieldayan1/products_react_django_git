from django.urls import path 
from .views import *
from .models import Product

urlpatterns = [
    path('products/', products , name = 'products'),
    path('products/<int:my_id>', products , name = 'products'),
    path('products/<int:my_id>/<str:prod>', products , name = 'products'),
    path('products/<str:prod>', products , name = 'products'),
]