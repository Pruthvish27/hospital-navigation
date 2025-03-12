from django.urls import path
from .views import add_data, see_data

urlpatterns = [
    path("add/", add_data, name="add_data"),
    path("see/", see_data, name="see_data"),
]
