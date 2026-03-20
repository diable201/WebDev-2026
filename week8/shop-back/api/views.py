from django.http import JsonResponse
from django.shortcuts import render
from .models import Product, Category


def product_list(request):
    data = [p.to_json() for p in Product.objects.all()]
    return JsonResponse(data, safe=False)


def product_detail(request, pk):
    try:
        product = Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        return JsonResponse({"error": "Product not found"}, status=404)
    return JsonResponse(product.to_json())

def category_list(request):
    data = [c.to_json() for c in Category.objects.all()]
    return JsonResponse(data, safe=False)


def category_detail(request, pk):
    try:
        category = Category.objects.get(pk=pk)
    except Category.DoesNotExist:
        return JsonResponse({"error": "Category not found"}, status=404)
    return JsonResponse(category.to_json())

def products_by_category(request, pk):
    try:
        category = Category.objects.get(pk=pk)
    except Category.DoesNotExist:
        return JsonResponse({"error": "Category not found"}, status=404)
    data = [p.to_json() for p in Product.objects.filter(category=category).all()]
    return JsonResponse(data, safe=False)