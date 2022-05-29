from django.urls import path
from .views import home_view, InvitationView, ConfirmationView, DetailsView, RefusedView
# from .views.home import home_view, legal_mentions
# from .views.forms import create_deck_view
# from .views.cards import QuickModeView, MemoryView, deck_menu_view, deck_update, \
#     deck_search_view, customize_deck, show_deck_view
# from .views.user import LogInFormView, SignUpFormView, LogOutView, EditAccountFormView

urlpatterns = [
    path('', home_view, name='home'),
    path('invitation/', InvitationView.as_view(), name="invitation"),
    path('invitation/confirmation/', ConfirmationView.as_view(), name="confirmation"),
    path('invitation/<int:guest>', InvitationView.as_view(), name="invitation_guest"),
    path('invitation/<int:guest>/confirmation/', ConfirmationView.as_view(), name="confirmation_guest"),
    path('invitation/<int:guest>/details/', DetailsView.as_view(), name="details_guest"),
    path('invitation/<int:guest>/refused/', RefusedView.as_view(), name="refused_guest"),
]