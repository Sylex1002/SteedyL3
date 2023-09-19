from django.db import models
from django.utils import timezone
from Messages.models import Message
from users.models import ProfilUser
from Focus.models import Focus
from Highlight.models import HighLight
from messageGroupe.models import Groupe, GroupeEnAttent
import uuid

from django.db.models.signals import pre_delete
from django.dispatch import receiver


class Notifications(models.Model):
    id = models.CharField(
        primary_key=True, default=uuid.uuid4, editable=False, max_length=36
    )
    # create de notification || dans une focus ,celui qui a creer le focus
    user = models.ForeignKey(
        ProfilUser,
        null=True,
        blank=True,
        on_delete=models.CASCADE,
        related_name="user_notification",
    )
    followers = models.ManyToManyField(
        ProfilUser, blank=True, related_name="followers_notification"
    )
    message = models.CharField(max_length=255)
    # focus et highlight
    focus = models.ForeignKey(Focus, null=True, blank=True, on_delete=models.CASCADE)
    highLight = models.ForeignKey(
        HighLight, null=True, blank=True, on_delete=models.CASCADE
    )
    # groupe
    groupe = models.ForeignKey(Groupe, null=True, blank=True, on_delete=models.CASCADE)
    # GroupeEnAttent
    groupeEnAttent = models.ForeignKey(
        GroupeEnAttent, null=True, blank=True, on_delete=models.CASCADE
    )
    read = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.message


# notification message
class MessageNotification(models.Model):
    id = models.CharField(
        primary_key=True, default=uuid.uuid4, editable=False, max_length=36
    )
    user_recipient = models.ForeignKey(
        ProfilUser, on_delete=models.CASCADE, related_name="users_recive_notif"
    )
    user_sender = models.ForeignKey(
        ProfilUser, on_delete=models.CASCADE, related_name="users_sender_notif"
    )
    message = models.ForeignKey(Message, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)

    class Meta:
        ordering = ["-timestamp"]

    def __str__(self):
        return f"Notification for {self.user_recipient.first_name}"


@receiver(pre_delete, sender=Message)
def delete_related_notification_msg(sender, instance, **kwargs):
    # Vérifirication
    if instance:
        # supprimer message
        MessageNotification.objects.filter(message=instance).delete()
