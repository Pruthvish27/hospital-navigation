from django.urls import path
from django.middleware.csrf import get_token
from django.http import JsonResponse
from .views import add_data, see_data

def get_csrf_token(request):
    return JsonResponse({'csrfToken': get_token(request)})

urlpatterns = [
    path("add/", add_data, name="add_data"),
    path("see/", see_data, name="see_data"),
    path("get-csrf-token/", get_csrf_token, name="get-csrf-token"),
]
