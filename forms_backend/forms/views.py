from django.shortcuts import render

# Create your views here.
# views.py
from django.shortcuts import render
from rest_framework.views import APIView
from django.http import JsonResponse
from rest_framework.response import Response
from .forms import MonthlyDataForm,RegisterSerializer
from .models import SICU,Register
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view


@api_view(['POST'])
def admin_registration(request):
    if request.method == 'POST':
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class MonthlyView(APIView):
    def post(self, request):
        serializer = MonthlyDataForm(data=request.data)
        if serializer.is_valid():
            employee = serializer.save()
            employee.save()
            return Response({'message': 'Submitted'})
        else:
            return Response(serializer.errors, status=400)

from django.core import serializers

@csrf_exempt
def get_monthly_data(request):
    monthly_data = SICU.objects.all()
    # Serialize queryset to JSON
    data = serializers.serialize('json', monthly_data)
    # Return JSON response
    return JsonResponse(data, safe=False)






    



    


from django.shortcuts import render
from django.http import JsonResponse
from .forms import OTDataForm
from .models import OTData
@csrf_exempt
def post_ot_data(request):
    if request.method == 'POST':
        form = OTDataForm(request.POST)
        if form.is_valid():
            form.save()
            return JsonResponse({'message': 'ICU data saved successfully'})
        else:
            return JsonResponse({'error': form.errors}, status=400)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)

def get_ot_data(request):
    if request.method == 'GET':
        icu_data = OTData.objects.all().values()
        return JsonResponse(list(icu_data), safe=False)
    else:
        return JsonResponse({'error': 'Only GET requests are allowed'}, status=405)
    


from .forms import RecoveryWardForm
from .models import RecoveryWard

def get_recovery_ward_data(request):
    if request.method == 'GET':
        recovery_ward_data = RecoveryWard.objects.all().values()
        return JsonResponse(list(recovery_ward_data), safe=False)
    else:
        return JsonResponse({'error': 'Only GET requests are allowed'}, status=405)




from .forms import NICUForm
from .models import NICU



def get_nicu_data(request):
    if request.method == 'GET':
        nicu_data = NICU.objects.all().values()
        return JsonResponse(list(nicu_data), safe=False)
    else:
        return JsonResponse({'error': 'Only GET requests are allowed'}, status=405)



from .forms import ChemoWardForm
from .models import ChemoWard


from rest_framework.decorators import api_view

from rest_framework import status

@api_view(['POST'])
@csrf_exempt
def post_chemo_ward_data(request):
    if request.method == 'POST':
        serializer = ChemoWardForm(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
def get_chemo_ward_data(request):
    if request.method == 'GET':
        chemo_ward_data = ChemoWard.objects.all().values()
        return JsonResponse(list(chemo_ward_data), safe=False)
    else:
        return JsonResponse({'error': 'Only GET requests are allowed'}, status=405)
    


from .forms import PhysiotherapyForm
from .models import Physiotherapy


# @csrf_exempt
def get_physiotherapy_dialysis_data(request):
    if request.method == 'GET':
        data = Physiotherapy.objects.all().values()
        return JsonResponse(list(data), safe=False)
    else:
        return JsonResponse({'error': 'Only GET requests are allowed'}, status=405)
    


from .forms import DialysisForm,SicuDataForm
from .models import Dialysis


from rest_framework.decorators import api_view

from rest_framework import status

@api_view(['POST'])
@csrf_exempt
def post_diagnostic_center_data(request):
    if request.method == 'POST':
        serializer = Dialysis(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
def get_diagnostic_center_data(request):
    if request.method == 'GET':
        data = Dialysis.objects.all().values()
        return JsonResponse(list(data), safe=False)
    else:
        return JsonResponse({'error': 'Only GET requests are allowed'}, status=405)
    


from .forms import EmergencyRoomForm,Labwardform,CTwardform,MRIwardform,Xraywardform,FrontofficeDataForm,MRDDataForm,firstsuitForm,secondsuitForm,firstfloorForm,secondfloorForm,thirdfloorForm,MICUForm,OTDataForm
from .models import EmergencyRoom,Lab,Frontoffice,MRD,firstsuit,Secondsuit,FirstFloor,Secondfloor,Thirdfloor,MICU,RecoveryWard



# from django.http import JsonResponse
# from .models import Firstfloor

# def get_emergency_room_data(request):
#     if request.method == 'GET':
#         ward = request.GET.get('ward')
#         date = request.GET.get('date')
#         year = request.GET.get('year')
#         month = request.GET.get('month')
        
#         print("Received parameters - ward:", ward, "date:", date, "year:", year, "month:", month)  # Add this line
        
#         query_params = {}

#         if ward and date:
#             query_params['ward'] = ward
#             query_params['selectedDate'] = date
#             print("Selected ward:", ward)  # Add this line
#             print("Selected date:", date)  # Add this line
        
#         print("Query parameters:", query_params)  # Add this line
        
#         if query_params:  # Check if query_params is not empty
#             data = Firstfloor.objects.filter(**query_params).values()
#             print("Retrieved data:", data)  # Add this line
#             return JsonResponse(list(data), safe=False)
#         else:
#             return JsonResponse({'error': 'Please select a date'}, status=400)
#     else:
#         return JsonResponse({'error': 'Only GET requests are allowed'}, status=405)


# from django.http import JsonResponse
# from .models import RecoveryWard
# from datetime import datetime

# def get_emergency_room_data(request):

    
#     if request.method == 'GET':
#         ward = request.GET.get('ward')
#         year = request.GET.get('year')
#         month = request.GET.get('month')
#         date = request.GET.get('date')
        
#         # Debugging: Print received parameters
#         print("Received parameters - ward:", ward, "year:", year, "month:", month, "date:", date)  
        
#         query_params = {}

#         if ward and date:
#             query_params['ward'] = ward
#             # Parse the date string into a datetime object
#             parsed_date = datetime.strptime(date, "%Y-%m-%dT%H:%M:%S.%fZ")
#             # Convert the datetime object to date
#             query_params['selectedDate'] = parsed_date.date()
#             print("Selected ward:", ward)  
#             print("Selected date:", query_params['selectedDate'])  

#         if ward and year and month:
#             # Construct the start and end date for the selected month and year
#             start_date = datetime(int(year), int(month), 1)
#             end_date = start_date.replace(day=1, month=int(month)+1) if int(month) < 12 else start_date.replace(year=int(year)+1, month=1)
#             query_params['ward'] = ward
#             query_params['selectedDate__gte'] = start_date
#             query_params['selectedDate__lt'] = end_date

#         # Debugging: Print query parameters
#         print("Query parameters:", query_params)  
        
#         if query_params:  
#             try:
#                 data = RecoveryWard.objects.filter(**query_params).values()
#                 # Debugging: Print retrieved data
#                 print("Retrieved data:", data)  
#                 return JsonResponse(list(data), safe=False)
#             except Exception as e:
#                 # Handle database errors
#                 return JsonResponse({'error': str(e)}, status=500)
#         else:
#             # Informative error message for missing parameters
#             return JsonResponse({'error': 'Please select a ward, year, and month'}, status=400)
#     else:
#         # Error message for disallowed methods
#         return JsonResponse({'error': 'Only GET requests are allowed'}, status=405)


from django.http import JsonResponse
from .models import RecoveryWard,SICU,CT,MRI,MRD,Xray,OTData,EmergencyRoom
from datetime import datetime, timedelta

def get_emergency_room_data(request):

    if request.method == 'GET':
        ward = request.GET.get('ward')
        year = request.GET.get('year')
        month = request.GET.get('month')
        date = request.GET.get('date')
        
        # Debugging: Print received parameters
        print("Received parameters - ward:", ward, "year:", year, "month:", month, "date:", date)  
        
        query_params = {}

        if ward and date:
            query_params['ward'] = ward
            # Parse the date string into a datetime object
            parsed_date = datetime.strptime(date, "%Y-%m-%dT%H:%M:%S.%fZ")
            # Convert the datetime object to date
            query_params['selectedDate'] = parsed_date.date()
            print("Selected ward:", ward)  
            print("Selected date:", query_params['selectedDate'])  

        if ward and year and month:
            # Construct the start and end date for the selected month and year
            start_date = datetime(int(year), int(month), 1)
            end_date = start_date.replace(day=1, month=int(month)+1) if int(month) < 12 else start_date.replace(year=int(year)+1, month=1)
            query_params['ward'] = ward
            query_params['selectedDate__gte'] = start_date
            query_params['selectedDate__lt'] = end_date

        # Debugging: Print query parameters
        print("Query parameters:", query_params)  

        if query_params:  
            try:
                # Get the model class based on the selected ward
                selected_model = get_ward_model(ward)
                data = selected_model.objects.filter(**query_params).values()
                # Debugging: Print retrieved data
                print("Retrieved data:", data)  
                return JsonResponse(list(data), safe=False)
            except Exception as e:
                # Handle database errors
                return JsonResponse({'error': str(e)}, status=500)
        else:
            # Informative error message for missing parameters
            return JsonResponse({'error': 'Please select a ward, year, and month'}, status=400)
    else:
        # Error message for disallowed methods
        return JsonResponse({'error': 'Only GET requests are allowed'}, status=405)


def get_ward_model(ward):
    # Define a dictionary to map wards to corresponding model classes
    ward_model_map = {
        #"wardoptions":modelname

        'SICU': SICU,
        'Recovery Ward': RecoveryWard,
        'First Floor':FirstFloor,
        'Second Floor':Secondfloor,
        'Front Office':Frontoffice,
        'Third Floor':Thirdfloor,
        'Front Office':Frontoffice,
        'Lab':Lab,
        'Chemo Ward':ChemoWard,
        'First Suit':firstsuit,
        'Second Suit':Secondsuit,
        'MICU':MICU,
        'MRD':MRD,
        'MRI':MRI,
        'NICU':NICU,
        'Physiotherapy':Physiotherapy,
        'X-Ray':Xray,
        'OT':OTData,
        'SICU':SICU,
        'Dialysis':Dialysis,
        'ER':EmergencyRoom,
        'CT':CT
        
    }
    # Get the corresponding model class based on the selected ward
    selected_model = ward_model_map.get(ward, None)
    if selected_model:
        return selected_model
    else:
        # Handle cases where the ward type is not recognized or supported
        raise ValueError('Ward type not recognized')

from .migrations.Views.constant import floor_beds
def availabilityofroomsandbeds(request, ward):
    try:
        # Define a dictionary to map wards to corresponding collection names
        ward_collection_map = {
        'SICU': SICU,
        'Recovery Ward': RecoveryWard,
        'First Floor':FirstFloor,
        'Second Floor':Secondfloor,
        'Front Office':Frontoffice,
        'Third Floor':Thirdfloor,
        'Front Office':Frontoffice,
        'Lab':Lab,
        'Chemo Ward':ChemoWard,
        'First Suit':firstsuit,
        'Second Suit':Secondsuit,
        'MICU':MICU,
        'MRD':MRD,
        'MRI':MRI,
        'NICU':NICU,
        'Physiotherapy':Physiotherapy,
        'X-Ray':Xray,
        'OT':OTData,
        'SICU':SICU,
        'Dialysis':Dialysis,
        'ER':EmergencyRoom,
        'CT':CT
# Add other wards and corresponding collection names as needed
        }
        # Get the corresponding model class based on the selected ward
        selected_model = ward_collection_map.get(ward, None)
        print("selected_model",selected_model)
        if selected_model:
            # Query the selected model for occupancy date
            yesterday = datetime.today() - timedelta(days=1)
            print("date",yesterday)
            form_data = selected_model.objects.filter(selectedDate=yesterday).first()
            print("form_data",form_data)
            if form_data:
                # Access the correct field for the number of occupied beds
                occupied_beds = form_data.numberOfBedsOccupied
                print('occupied_beds_if',occupied_beds)
            else:
                # If no data is found, log a message for debugging
                print('No data found for the selected date')
                # If no data is found, occupied beds should be 0
                occupied_beds = 0
                print('occupied_beds_else',occupied_beds)
        else:
            # Handle cases where the ward type is not recognized or supported
            return JsonResponse({'error': 'Ward type not recognized'}, status=400)
        # Calculate the number of available beds using data from constants.py
        total_beds = floor_beds.get(ward, 0)  # Get total beds, default to 0 if ward not found
        available_beds = total_beds - int(occupied_beds)  # Convert occupied beds to integer before subtracting
        # Return the data in JSON format
        return JsonResponse({
            'ward': ward,
            'numberOfBedsOccupied': occupied_beds,
            'numberOfBedsAvailable': available_beds
        })
    except Exception as e:
        # Log the exception for debugging purposes
        print(f"Error: {e}")
        # Return a more descriptive error message
        return JsonResponse({'error': 'An error occurred while processing your request'}, status=500)


    



    
from rest_framework.decorators import api_view

from rest_framework import status

@api_view(['POST'])
@csrf_exempt
def submit_sicu_data(request):
    if request.method == 'POST':
        serializer = SicuDataForm(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['POST'])
@csrf_exempt
def submit_lab_data(request):
    if request.method == 'POST':
        serializer = Labwardform(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
@csrf_exempt
def submit_CT_data(request):
    if request.method == 'POST':
        serializer = CTwardform(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(['POST'])
@csrf_exempt
def submit_MRI_data(request):
    if request.method == 'POST':
        serializer = MRIwardform(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(['POST'])
@csrf_exempt
def submit_Xray_data(request):
    if request.method == 'POST':
        serializer = Xraywardform(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
@csrf_exempt
def post_nicu_data(request):
    if request.method == 'POST':
        serializer = NICUForm(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)





@api_view(['POST'])
@csrf_exempt
def post_physiotherapy_dialysis_data(request):
    if request.method == 'POST':
        serializer = PhysiotherapyForm(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
@csrf_exempt
def post_recovery_ward_data(request):
    if request.method == 'POST':
        serializer = RecoveryWardForm(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


@api_view(['POST'])
@csrf_exempt
def post_frontoffice_data(request):
    if request.method == 'POST':
        serializer = FrontofficeDataForm(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@csrf_exempt
def post_MRD_data(request):
    if request.method == 'POST':
        serializer =MRDDataForm(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@csrf_exempt
def post_firstsuit_data(request):
    if request.method == 'POST':
        serializer =firstsuitForm(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['POST'])
@csrf_exempt
def post_secondsuit_data(request):
    if request.method == 'POST':
        serializer =secondsuitForm(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['POST'])
@csrf_exempt
def post_emergency_room_data(request):
    if request.method == 'POST':
        serializer =EmergencyRoomForm(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@csrf_exempt
def post_firstfloor_data(request):
    if request.method == 'POST':
        serializer =firstfloorForm(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
@csrf_exempt
def post_secondfloor_data(request):
    if request.method == 'POST':
        serializer =secondfloorForm(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
@csrf_exempt
def post_thirdfloor_data(request):
    if request.method == 'POST':
        serializer =thirdfloorForm(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
@csrf_exempt
def post_MICU_data(request):
    if request.method == 'POST':
        serializer =MICUForm(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
@csrf_exempt
def post_OT_data(request):
    if request.method == 'POST':
        serializer =OTDataForm(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)