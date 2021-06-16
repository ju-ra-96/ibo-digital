from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("create-standalone/", views.create_standalone, name="create-standalone"),
    path("standalone-account/<str:address>/", views.standalone_account, name="standalone-account"),
    path("initial-funds/<str:receiver>/", views.initial_funds, name="initial-funds"),
    path("transfer-funds/<str:sender>/", views.transfer_funds, name="transfer-funds"),
]
