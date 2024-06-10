# urls.py
from django.urls import path
from . import views
from .views import get_ot_data,post_ot_data,admin_registration,get_formula_data
from .views import post_recovery_ward_data, get_recovery_ward_data
from .views import post_nicu_data, get_nicu_data,availabilityofroomsandbeds
from .views import post_chemo_ward_data, get_chemo_ward_data,post_MICU_data,post_OT_data
from .views import post_physiotherapy_dialysis_data, get_physiotherapy_dialysis_data,post_secondsuit_data,post_firstfloor_data,post_secondfloor_data,post_thirdfloor_data
from .views import post_diagnostic_center_data, get_diagnostic_center_data,post_frontoffice_data,post_MRD_data,post_firstsuit_data
from .views import post_emergency_room_data, get_emergency_room_data, submit_sicu_data,submit_lab_data,submit_CT_data,submit_MRI_data,submit_Xray_data

urlpatterns = [
    # path('submit/', views.MonthlyView.as_view()),
    path('admin_registration/',admin_registration, name='admin_registration'),
    path('get/', views.get_monthly_data, name='get_monthly_data'),
    path('get-ot-data/', get_ot_data, name='get_ot_data'),
    path('post-recovery-ward-data/', post_recovery_ward_data, name='post_recovery_ward_data'),
    path('get-recovery-ward-data/', get_recovery_ward_data, name='get_recovery_ward_data'),
    path('post-nicu-data/', post_nicu_data, name='post_nicu_data'),
    path('get-nicu-data/', get_nicu_data, name='get_nicu_data'),
    path('post-chemo-ward-data/', post_chemo_ward_data, name='post_chemo_ward_data'),
    path('get-chemo-ward-data/', get_chemo_ward_data, name='get_chemo_ward_data'),
    path('post-physiotherapy-dialysis-data/', post_physiotherapy_dialysis_data, name='post_physiotherapy_dialysis_data'),
    path('get-physiotherapy-dialysis-data/', get_physiotherapy_dialysis_data, name='get_physiotherapy_dialysis_data'),
    path('post-diagnostic-center-data/', post_diagnostic_center_data, name='post_diagnostic_center_data'),
    path('get-diagnostic-center-data/', get_diagnostic_center_data, name='get_diagnostic_center_data'),
    path('post-emergency-room-data/', post_emergency_room_data, name='post_emergency_room_data'),
    path('get-emergency-room-data/', get_emergency_room_data, name='get_emergency_room_data'),
    path('sicu-submit/', submit_sicu_data, name='submit_sicu_data'),
    path('Lab-submit/', submit_lab_data, name='submit_Lab_data'),
    path('Lab-MRI/', submit_MRI_data, name='submit_MRI_data'),
    path('Lab-CT/', submit_CT_data, name='submit_CT_data'),
    path('Lab-Xray/', submit_Xray_data, name='submit_Xray_data'),
    path('Frontoffice/', post_frontoffice_data, name='Frontoffice_data'),
    path('MRDData/', post_MRD_data, name='MRD_data'),
    path('firstsuit/', post_firstsuit_data, name='firstsuit_data'),
    path('secondsuit/', post_secondsuit_data, name='secondsuit_data'),
    path('firstfloor/', post_firstfloor_data, name='firstfloor_data'),
    path('secondfloor/', post_secondfloor_data, name='secondfloor_data'),
    path('thirdfloor/', post_thirdfloor_data, name='thirdfloor_data'),
    path('post-MICU/', post_MICU_data, name='MICU_data'),
    path('post-OT/', post_OT_data, name='OT_data'),
    path('formula-data/', get_formula_data, name='get_formula_data'),
    path('availabilityofroomsandbeds/<str:ward>/',availabilityofroomsandbeds, name='availabilityofroomsandbeds'),
]