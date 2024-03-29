from django.shortcuts import redirect, render, get_object_or_404  , HttpResponse
from django.urls import reverse  
from django.views.decorators.clickjacking import xframe_options_exempt,xframe_options_deny
from django.contrib.auth.decorators import login_required
from django.utils import timezone
from datetime import *
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect
from .models import Product

#products - CRUD
def products(request  , my_id = 0  , prod = " "):
    if request.method == "GET":
        array =[]
        products = Product.objects.all()
        if my_id == 0:
            for product in products:
                array.append({'id':product.id , 'name':product.name ,'price': product.price ,'stock': product.stock , 'imageName': product.imageName , 'category':product.category })
        else:
            product = products.get(id=my_id)
            array={'id':product.id , 'name':product.name ,'price': product.price ,'stock': product.stock , 'imageName': product.imageName , 'category':product.category }
        return JsonResponse(array,safe=False)
    elif request.method == "DELETE":
        prod = Product.objects.get(id = my_id)
        prod.delete()
        return HttpResponse("product delited !")
    if request.method == "POST":
        line = prod.split(',')
        my_id = Product.objects.last().id+1
        if my_id<=77:
            my_image = f'{my_id}.jpg' 
        else: 
            my_image = '1.jpg' 
        product = Product.objects.create(id = my_id , name = line[0] , stock = int(line[1]) , price = int(line[2]) , imageName = my_image , category = int(line[3]))
        product.save()
        return JsonResponse({'id':product.id ,'name':product.name ,'price': product.price ,'stock': product.stock , 'imageName':product.imageName , 'category':product.category},safe=False) 
    elif request.method == "PUT":
        line = prod.split(',')
        product = Product.objects.get(id = my_id)
        product.name = line[0]
        product.stock = int(line[1])
        product.price = int(line[2])
        product.category = int(line[3])
        if my_id<=77:
            my_image = f'{my_id}.jpg' 
        else: 
            my_image = '1.jpg'
        product.save()
        return JsonResponse({'id':product.id ,'name':product.name ,'price': product.price ,'stock': product.stock , 'imageName':product.imageName , 'category':product.category },safe=False) 
    else:
        return HttpResponse("wrong choose !")





    
