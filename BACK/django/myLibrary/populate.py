#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
from  products.models import Product
from myLibrary import settings


# def main():
    # module_dir = os.path.dirname(__file__)  
    # file_path = os.path.join(module_dir, 'products.txt') 
    # data = open(file_path , 'r')
    # products = data.read()
    # for product in products:
    #     new_product = Product(name = product["name"] , price = product["price"] , stock = product["stock"])
    #     new_product.save()
    # data.close()



# if __name__ == '__main__':
#     main()
