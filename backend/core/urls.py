from django.urls import path
from testapp.views import add_entry, get_entries  

urlpatterns = [
    path("add-entry/", add_entry, name="add_entry"),
    path("get-entries/", get_entries, name="get_entries"),
]
