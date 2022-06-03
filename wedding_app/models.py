from django.db import models
import random


CHOICE = [
    (0, "PENDING"),
    (1, "ACCEPTED"),
    (2, "REFUSED"),
]

GROUP = [
    (0, "LOVE COUCH"),
    (1, "VIP LEFT"),
    (2, "VIP RIGHT"),
    (3, "Table 1"),
    (4, "Table 2"),
    (5, "Table 3"),
    (6, "Table 4"),
    (7, "Table 5"),
    (8, "Table 6"),
    (9, "Table 7"),
    (10, "NONE")
]


# Create your models here.
class Guest(models.Model):
    name = models.CharField(verbose_name='name', max_length=200)
    emails = models.EmailField(max_length=254, blank=True, null=True)
    read = models.BooleanField(verbose_name="read", default=False)
    choice = models.IntegerField(
        verbose_name="choice",
        default=0,
        choices=CHOICE,
    )
    code = models.IntegerField(verbose_name='code', default=0, null=True)
    group_seat = models.IntegerField(
        verbose_name="group seat",
        default=0,
        choices=GROUP,
    )

    def save(self, *args, **kwargs):
        if self.code == 0:
            self.code = random.randint(1, 100000000)
        super(Guest, self).save(*args, **kwargs)
