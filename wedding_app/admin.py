from django.contrib import admin
from .models import Guest


@admin.register(Guest)
class GuestAdmin(admin.ModelAdmin):
    list_display = ('name', 'read', 'choice',)
    search_fields = ('name', 'read', 'choice',)
