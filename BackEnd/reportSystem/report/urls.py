

from django.urls import path
from .views import handle_coordinates, Report_View, Report_Details_View, Authentication


urlpatterns = [
    path('coordinates/', handle_coordinates, name='handle_coordinates'),
    path('reports/', Report_View.as_view(), name='handle_reports'),
    path('report_details/<int:id>/', Report_Details_View.as_view(), name='handle_report_details'),
    path('auth/', Authentication.as_view(), name='handle_auth'),
]
