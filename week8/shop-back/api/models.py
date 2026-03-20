from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100, verbose_name="Category Name")

    def __str__(self):
        return self.name

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name
        }

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"


class Product(models.Model):
    name = models.CharField(max_length=100, verbose_name="Product Name")
    price = models.FloatField(verbose_name="Product Price")
    description = models.TextField(verbose_name="Product Description")
    count = models.IntegerField(default=0, verbose_name="Product Count")
    is_active = models.BooleanField(default=True, verbose_name="Product Active")
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name='products',
        verbose_name="Product Category"
    )

    def __str__(self):
        return self.name

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'price': self.price,
            'description': self.description,
            'count': self.count,
            'is_active': self.is_active,
            'category_id': self.category.id
        }