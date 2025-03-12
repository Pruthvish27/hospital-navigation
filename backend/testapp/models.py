from django.db import models

class TestEntry(models.Model):
    name = models.CharField(max_length=255)
    number = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.number} ({self.created_at})"