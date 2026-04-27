from django.contrib import admin

from apps.rules_engine.models import Evaluation, Rule


@admin.register(Rule)
class RuleAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "priority", "action")
    search_fields = ("name", "action")
    list_filter = ("priority",)
    ordering = ("-priority", "id")


@admin.register(Evaluation)
class EvaluationAdmin(admin.ModelAdmin):
    list_display = ("id", "output", "created_at")
    search_fields = ("output",)
    list_filter = ("created_at", "output")
    readonly_fields = ("created_at",)
    ordering = ("-created_at",)
