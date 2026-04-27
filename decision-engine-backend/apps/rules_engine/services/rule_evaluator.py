from __future__ import annotations

from dataclasses import dataclass
from decimal import Decimal, InvalidOperation
from typing import Any, Callable

from apps.rules_engine.models import Rule

SUPPORTED_OPERATORS = (">=", "<=", "==", ">", "<")


class ConditionFormatError(ValueError):
    """Raised when a rule condition expression has invalid syntax."""


@dataclass(frozen=True)
class DecisionResult:
    output: str
    matched_rule: Rule | None


def evaluate_input_against_rules(input_payload: dict[str, Any]) -> DecisionResult:
    """
    Evaluate all rules by descending priority and return the first matching action.
    """
    rules = Rule.objects.only("id", "name", "condition", "action", "priority").order_by("-priority", "id")

    for rule in rules:
        try:
            if rule_matches_input(rule.condition, input_payload):
                return DecisionResult(output=rule.action, matched_rule=rule)
        except ConditionFormatError:
            # Invalid rule format should not break request processing.
            continue

    return DecisionResult(output="NO_MATCH", matched_rule=None)


def rule_matches_input(condition_map: dict[str, Any], input_payload: dict[str, Any]) -> bool:
    if not isinstance(condition_map, dict) or not condition_map:
        raise ConditionFormatError("Condition must be a non-empty object.")

    for field_name, expected_expression in condition_map.items():
        if field_name not in input_payload:
            return False

        operator, expected_value = parse_condition_expression(expected_expression)
        actual_value = input_payload[field_name]

        if not compare_values(actual_value, expected_value, operator):
            return False

    return True


def parse_condition_expression(expression: Any) -> tuple[str, Any]:
    if not isinstance(expression, str):
        raise ConditionFormatError("Condition expression must be a string.")

    raw_expression = expression.strip()
    if not raw_expression:
        raise ConditionFormatError("Condition expression cannot be empty.")

    for operator in SUPPORTED_OPERATORS:
        if raw_expression.startswith(operator):
            raw_target = raw_expression[len(operator) :].strip()
            if raw_target == "":
                raise ConditionFormatError("Condition expression is missing a comparison value.")
            return operator, normalize_literal(raw_target)

    raise ConditionFormatError(
        f"Unsupported operator in expression '{expression}'. Supported operators: {', '.join(SUPPORTED_OPERATORS)}"
    )


def normalize_literal(raw_value: str) -> Any:
    lowered = raw_value.lower()
    if lowered == "true":
        return True
    if lowered == "false":
        return False

    if (raw_value.startswith("\"") and raw_value.endswith("\"")) or (
        raw_value.startswith("'") and raw_value.endswith("'")
    ):
        return raw_value[1:-1]

    try:
        return Decimal(raw_value)
    except InvalidOperation:
        return raw_value


def compare_values(actual_value: Any, expected_value: Any, operator: str) -> bool:
    comparator_map: dict[str, Callable[[Any, Any], bool]] = {
        "==": lambda left, right: left == right,
        ">": lambda left, right: left > right,
        "<": lambda left, right: left < right,
        ">=": lambda left, right: left >= right,
        "<=": lambda left, right: left <= right,
    }

    if operator not in comparator_map:
        raise ConditionFormatError(f"Operator '{operator}' is not supported.")

    if operator == "==":
        return comparator_map[operator](coerce_for_equality(actual_value), expected_value)

    numeric_actual = coerce_numeric(actual_value)
    numeric_expected = coerce_numeric(expected_value)

    if numeric_actual is None or numeric_expected is None:
        return False

    return comparator_map[operator](numeric_actual, numeric_expected)


def coerce_numeric(value: Any) -> Decimal | None:
    if isinstance(value, bool):
        return Decimal(int(value))

    if isinstance(value, Decimal):
        return value

    try:
        return Decimal(str(value))
    except (InvalidOperation, ValueError, TypeError):
        return None


def coerce_for_equality(value: Any) -> Any:
    if isinstance(value, str):
        numeric_value = coerce_numeric(value)
        return numeric_value if numeric_value is not None else value
    return value
