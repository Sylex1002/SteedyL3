from django.urls import path
from Messages.views import (
    get_conversations,
    delete_message,
    delete_conversations,
    MessageList,
    get_unread_messages_for_user,
    list_prof_message_for_etudiant,
    list_prof_message_for_prof,
    mark_messages_as_read,
    get_all_my_conversation,
)

urlpatterns = [
    path(
        "get_conversations/<str:user_recipient>/<str:user_sender>/",
        get_conversations,
        name="get_conversations",
    ),
    path("delete-messages/<str:message_id>/", delete_message),
    path(
        "delete-conversations/<str:recipient_id>/<str:sender>/",
        delete_conversations,
        name="delete_conversations",
    ),
    path(
        "get-messages-NOT-read/<str:user_id>/",
        get_unread_messages_for_user,
        name="get_unread_messages_for_user",
    ),
    path("messages/", MessageList.as_view()),
    path(
        "notification-messages-etudiant/<str:id>/",
        list_prof_message_for_etudiant
    ),
    path("notification-messages-prof/<str:id>/", list_prof_message_for_prof),
    path("message-all-read/", mark_messages_as_read),
    path("conversations/<str:id>/", get_all_my_conversation),
]
