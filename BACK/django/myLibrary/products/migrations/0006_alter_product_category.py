# Generated by Django 4.0.6 on 2023-01-15 13:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0005_alter_product_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='category',
            field=models.IntegerField(choices=[(0, 'ALL'), (1, 'vegetables & fruits'), (2, 'meat'), (3, 'cakes'), (4, 'drinks')], default=0),
        ),
    ]
