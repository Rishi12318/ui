from django.urls import path

from apps.rules_engine.views import EvaluateAPIView, RuleListCreateAPIView

urlpatterns = [
    path("evaluate/", EvaluateAPIView.as_view(), name="evaluate-input"),
    path("rules/", RuleListCreateAPIView.as_view(), name="rule-list-create"),
]
