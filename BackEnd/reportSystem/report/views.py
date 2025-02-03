from django.shortcuts import render, get_object_or_404

from django.http import JsonResponse
from django.views import View
from django.forms import model_to_dict

from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from .models import Report
import json


# Create your views here. 

@csrf_exempt  # Disable CSRF protection for simplicity (not recommended in production)
@require_http_methods(["POST", "OPTIONS"])  
def handle_coordinates(request):
    if request.method == 'OPTIONS':
        # Respond to the preflight request
        response = JsonResponse({'message': 'CORS preflight'})
        response["Access-Control-Allow-Origin"] = "*"  # Allow any origin for now
        response["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        response["Access-Control-Allow-Headers"] = "Content-Type"
        response["Content-Type"] = "application/json"
        return response


    if request.method == 'POST':
        try:
            data = json.loads(request.body)  # Parse the JSON payload
            lat = data.get('lat')
            lng = data.get('lng')

            # Do something with the data (e.g., save to database)
            print(lat, lng)
            report_instance = Report.objects.create(
                                lat=lat, 
                                lng=lng
                                )
            
            return JsonResponse({'status': 'success', 
                                 'message': 'report created successfully',
                                'report': {
                                        'id': report_instance.id, 
                                         'details': {'lat': lat, 'lng': lng}}}, 
                                         status=200)
    

            # For now, just return the data back as a response
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
    return JsonResponse({'status': 'error', 'message': 'Invalid HTTP method'}, status=405)


class Report_View(View):
    def get(self, request):
        reports = Report.objects.all()
        reports_list = [model_to_dict(report) for report in reports]

        return JsonResponse({'status': 'success', 'status_code': 200,
                            'reports': reports_list
                        })

class Report_Details_View(View):
    def get(self, request, id, *args, **kwargs):
        report = get_object_or_404(Report, id=id)
        report_dict = model_to_dict(report)
        return JsonResponse({'status': 'success', 'status_code': 200,
                            'report': report_dict
                        })  
    

class Authentication(View):
    def get(self, request):
         return JsonResponse({"message": "Login successful", "status": "success"}, status=200)
    
    