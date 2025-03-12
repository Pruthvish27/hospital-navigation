from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import TestEntry
from datetime import datetime

@csrf_exempt
def add_entry(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            name = data.get("name")
            number = data.get("number")
            new_entry = TestEntry(name=name, number=number)
            new_entry.save()
            return JsonResponse({"message": "Data added successfully!"}, status=201)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

def see_entries(request):
    if request.method == "GET":
        entries = list(TestEntry.objects.values("name", "number", "created_at"))
        return JsonResponse({"entries": entries}, status=200)