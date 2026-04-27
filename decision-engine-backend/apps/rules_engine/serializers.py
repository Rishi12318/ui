from __future__ import annotations

from typing import Any

from rest_framework import serializers

from apps.rules_engine.models import Rule
from apps.rules_engine.services.rule_evaluator import ConditionFormatError, parse_condition_expression


class RuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rule
        fields = ["id", "name", "condition", "action", "priority"]

    def validate_condition(self, value: dict[str, Any]) -> dict[str, Any]:
        if not isinstance(value, dict) or not value:
            raise serializers.ValidationError("Condition must be a non-empty JSON object.")

        for field_name, expression in value.items():
            if not isinstance(field_name, str) or not field_name.strip():
                raise serializers.ValidationError("Condition keys must be non-empty strings.")
            try:
                parse_condition_expression(expression)
            except ConditionFormatError as exc:
                raise serializers.ValidationError(f"Invalid condition for '{field_name}': {exc}") from exc

        return value


class EvaluationRequestSerializer(serializers.Serializer):
    input_data = serializers.JSONField()

    def validate_input_data(self, value: dict[str, Any]) -> dict[str, Any]:
        if not isinstance(value, dict) or not value:
            raise serializers.ValidationError("input_data must be a non-empty JSON object.")
        return value


class EvaluationResponseSerializer(serializers.Serializer):
    output = serializers.CharField()
    matched_rule_id = serializers.IntegerField(allow_null=True)
    matched_rule_name = serializers.CharField(allow_null=True)
