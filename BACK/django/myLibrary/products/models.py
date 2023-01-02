from django.db import models
from django.core.validators import MinValueValidator , MaxValueValidator


class Product(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=50 , null = True , blank = True)
    price = models.IntegerField( null = True , blank = True)
    stock = models.IntegerField( null = True , blank = True)
    imageName = models.CharField(max_length=100 , null = True , blank = True)
    image = models.ImageField()


    def __str__(self):
        return f"id:{self.id} | name:{self.name} |  price:{self.price} | stock:{self.stock} "


