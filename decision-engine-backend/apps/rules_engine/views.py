from __future__ import annotations

from django.db import transaction
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.rules_engine.models import Evaluation, Rule
from apps.rules_engine.serializers import (
    EvaluationRequestSerializer,
    EvaluationResponseSerializer,
    RuleSerializer,
)
from apps.rules_engine.services.rule_evaluator import evaluate_input_against_rules


class RuleListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = RuleSerializer

    def get_queryset(self):
        # No related fields on Rule today; keep query narrow for list response.
        return Rule.objects.only("id", "name", "condition", "action", "priority").order_by("-priority", "id")


class EvaluateAPIView(APIView):
    @transaction.atomic
    def post(self, request, *args, **kwargs):
        request_serializer = EvaluationRequestSerializer(data=request.data)
        request_serializer.is_valid(raise_exception=True)

        decision = evaluate_input_against_rules(request_serializer.validated_data["input_data"])

        evaluation_record = Evaluation.objects.create(
            input_data=request_serializer.validated_data["input_data"],
            output=decision.output,
        )

        response_serializer = EvaluationResponseSerializer(
            {
                "output": evaluation_record.output,
                "matched_rule_id": decision.matched_rule.id if decision.matched_rule else None,
                "matched_rule_name": decision.matched_rule.name if decision.matched_rule else None,
            }
        )

        return Response(response_serializer.data, status=status.HTTP_200_OK)
