# Import jsonify for returning JSON responses
from flask import request, jsonify, render_template
from backend import app
import numpy as np
from backend.users.utils import get_location_info, add_line, add_marker, add_line_to_feature_collection, add_marker_to_feature_collection
from backend import supabase
import openrouteservice as ors
import folium


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
        data, count = supabase.table('routes').insert(
            {'source_loc': source_loc, 'destination_loc': destination_loc, 'time': time, 'passengers': passengers, 'car_type': car_type}).execute()
        # Data is [lat,long]

        # Assuming the insertion was successful
        response_data = {'message': 'Route published successfully'}
        status_code = 200
    except Exception as e:
        # Handle exceptions, e.g., database errors
        response_data = {'error': str(e)}
        status_code = 500  # Use an appropriate HTTP status code for errors

    # return jsonify(response_data), status_code  # Return a JSON response with status code
    return jsonify({'source_loc': source_loc, 'destination_loc': destination_loc}), status_code


@app.route('/search', methods=['GET', 'POST'])
def search():
    srcd = {}
    desd = {}

    client = ors.Client(key='5b3ce3597851110001cf62485a84c527d2744fd9b08eb7b6ce3ad467')

    data = request.get_json()
    src = data.get('source')
    des = data.get('destination')

    feature_collection = {
    "type": "FeatureCollection",
    "features": []
    }

    src_info = get_location_info(src['name'])
    des_info = get_location_info(des['name'])

    user_cords = [src_info, des_info]

    m = folium.Map(location=list(
        reversed(user_cords[0])), tiles="cartodbpositron", zoom_start=13)
    user_route = client.directions(coordinates=user_cords,
                                   profile='foot-walking',
                                   format='geojson')

    ucords = np.array(user_cords)
    # add user line and markers
    add_line(path=user_route, m=m)
    add_marker(
        cords=user_cords[0], message=f'User-start {user_cords[0]}', color="orange", m=m)
    add_marker(
        cords=user_cords[1], message=f'User-end {user_cords[1]}', color="purple", m=m)
    
    add_marker_to_feature_collection(user_cords[0], f'User-start {user_cords[0]}', "#aaed37", feature_collection)
    add_marker_to_feature_collection(user_cords[1], f'User-end {user_cords[1]}', "#aaed37", feature_collection)
    add_line_to_feature_collection(user_route, feature_collection, color="#37ed67")

    res = supabase.table('routes').select("*").execute()
    print(res)
    id_cords = {}
    for i in res.data:
        id_cords[i['id']] = [[i['source']['lng'], i['source']['lat']],
                             [i['destination']['lng'], i['destination']['lat']]]

    for idx, coords in id_cords.items():
        route = client.directions(coordinates=coords,
                                  profile='foot-walking',
                                  format='geojson')

        route_steps = route['features'][0]['geometry']['coordinates']

        add_line(path=route, m=m)
        add_marker(
            cords=coords[0], message=f'Route-start {coords[0]}', color="green", m=m)
        add_marker(
            cords=coords[1], message=f'Route-end {coords[1]}', color="red", m=m)
        
        add_marker_to_feature_collection(coords[0], f'Route-start {coords[0]}', "#198a20", feature_collection)
        add_marker_to_feature_collection(coords[1], f'Route-end {coords[1]}', "#e04534", feature_collection)
        add_line_to_feature_collection(route, feature_collection, color="#2fb9eb", routeid=idx)

        steps = np.array(route_steps)
        src_diff = np.sum(np.abs(steps-ucords[0]), axis=1)
        des_diff = np.sum(np.abs(steps-ucords[1]), axis=1)

        min_src = np.argmin(src_diff)
        min_des = np.argmin(des_diff)

        srcd[src_diff[min_src]] = [steps[min_src], idx]
        desd[des_diff[min_des]] = [steps[min_src], idx]

    vids = []
    for i in range(min(3, len(srcd))):
        min_src_key = min(list(srcd.keys()))
        min_src_cord = srcd[min_src_key][0]
        vids.append(srcd[min_src_key][1])
        min_des_key = min(list(desd.keys()))
        min_des_cord = desd[min_des_key]

        del srcd[min_src_key]
        del desd[min_des_key]

        add_marker(cords=min_src_cord,
                   message=f"Minsrc- {min_src_cord}", color="black", m=m)
        
        add_marker_to_feature_collection(min_src_cord,message=f"Minsrc- {min_src_cord}",color="#ffffff", feature_collection=feature_collection)


    return jsonify(feature_collection), 200


# Define a function to convert coordinates to GeoJSON Point feature
def create_point_feature(lat, lon, color, message):
    feature = {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [lon, lat]
        },
        "properties": {
            "marker-color": color,
            "marker-symbol": "circle",
            "marker-size": "medium",
            "marker-description": message
        }
    }
    return feature

# Define a function to convert a list of coordinates to a GeoJSON LineString feature
def create_line_feature(coordinates, color):
    feature = {
        "type": "Feature",
        "geometry": {
            "type": "LineString",
            "coordinates": coordinates
        },
        "properties": {
            "stroke": color,
            "stroke-width": 3
        }
    }
    return feature


@app.route('/trip_map', methods=['GET', 'POST'])
def trip_map():
    client = ors.Client(
        key='5b3ce3597851110001cf62485a84c527d2744fd9b08eb7b6ce3ad467')

    data = request.get_json()
    source = data.get('source')
    destination = data.get('destination')

    trip_cords = [[source['lng'], source['lat']],
                  [destination['lng'], destination['lat']]]

    m = folium.Map(location=list(
        reversed(trip_cords[0])), tiles="cartodbpositron", zoom_start=13)
    trip_route = client.directions(coordinates=trip_cords,
                                   profile='foot-walking',
                                   format='geojson')
    # Create GeoJSON features for markers, polyline, and route
    geojson_data = {
        "type": "FeatureCollection",
        "features": [
            create_point_feature(source['lat'], source['lng'],
                                 "green", f'User-start {trip_cords[0]}'),
            create_point_feature(destination['lat'], destination['lng'],
                                 "red", f'User-end {trip_cords[1]}'),
            # Add the route as a GeoJSON LineString
            create_line_feature(
                trip_route['features'][0]['geometry']['coordinates'], "blue")
        ]
    }
    # print(geojson_data)

    # Return the GeoJSON data in the response
    return jsonify(geojson_data), 200
