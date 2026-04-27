from django.db import models


class Rule(models.Model):
    name = models.CharField(max_length=120, unique=True)
    condition = models.JSONField()
    action = models.CharField(max_length=255)
    priority = models.PositiveIntegerField(db_index=True)

    class Meta:
        ordering = ["-priority", "id"]
        indexes = [
            models.Index(fields=["priority", "id"], name="rule_priority_idx"),
        ]

    def __str__(self) -> str:
        return f"{self.name} (priority={self.priority})"


class Evaluation(models.Model):
    input_data = models.JSONField()
    output = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return f"Evaluation#{self.pk} -> {self.output}"
