from flask import request, Blueprint, jsonify  # Import jsonify for returning JSON responses
from backend import app
from backend.users.utils import get_location_info

# Assuming 'supabase' is properly imported and configured elsewhere in your application

@app.route('/publish', methods=['POST'])
def publish():
    try:
        data = request.get_json()  # Parse JSON data from the request body
    
        source = data.get('source')
        destination = data.get('destination')
        time = data.get('time')
        passengers = data.get('passengers')
        car_type = data.get('car_type')
        
        source_loc = get_location_info(source)
        destination_loc = get_location_info(destination)
        
        # Perform the database insertion using 'supabase' here
        data, count = supabase.table('routes').insert({'source_loc':source_loc,'destination_loc':destination_loc,'time':time,'passengers':passengers,'car_type':car_type}).execute()
        #Data is [lat,long]
        
        # Assuming the insertion was successful
        response_data = {'message': 'Route published successfully'}
        status_code = 200
    except Exception as e:
        # Handle exceptions, e.g., database errors
        response_data = {'error': str(e)}
        status_code = 500  # Use an appropriate HTTP status code for errors
    
    # return jsonify(response_data), status_code  # Return a JSON response with status code
    return jsonify({'source_loc': source_loc, 'destination_loc': destination_loc}), status_code


@app.route('/search_route', methods=['GET', 'POST'])
def search_route():
    data = request.get_json()
    source = data.get('source')
    destination = data.get('destination')
    
    source_loc = get_location_info(source)
    destination_loc = get_location_info(destination)
    
    routes_info = get_routes_info(source,destination,source_loc[0],source_loc[1])
