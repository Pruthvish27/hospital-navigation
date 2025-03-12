from django.shortcuts import render
from django.http import JsonResponse
from .models import TestEntry

def add_data(request):
    if request.method == "POST":
        name = request.POST.get("name", "Default Name")
        entry = TestEntry.objects.create(name=name)
        return JsonResponse({"message": "Data added", "id": entry.id})

    return JsonResponse({"error": "Invalid request"}, status=400)

def see_data(request):
    data = list(TestEntry.objects.values())
    return JsonResponse({"entries": data})
