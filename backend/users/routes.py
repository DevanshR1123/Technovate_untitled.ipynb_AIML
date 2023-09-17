from flask import request, jsonify  # Import jsonify for returning JSON responses
from backend import app
import numpy as np
from backend.users.utils import get_location_info, add_line, add_marker
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
    # src_minval=99
    # des_minval=99
    srcd = {}
    desd = {}

    client = ors.Client(
        key='5b3ce3597851110001cf62485a84c527d2744fd9b08eb7b6ce3ad467')

    data = request.get_json()
    src = data.get('source')
    des = data.get('destination')

    src_info = get_location_info(src.name)
    des_info = get_location_info(des.name)

    # src_info = get_location_info(src_loc)
    # des_info = get_location_info(des_loc)
    user_cords = [src_info, des_info]

    m = folium.Map(location=list(
        reversed(user_cords[0])), tiles="cartodbpositron", zoom_start=13)
    user_route = client.directions(coordinates=user_cords,
                                   profile='foot-walking',
                                   format='geojson')

    # user_route_steps = user_route['features'][0]['geometry']['coordinates']
    ucords = np.array(user_cords)
    # add user line and markers
    add_line(path=user_route, m=m)
    add_marker(
        cords=user_cords[0], message=f'User-start {user_cords[0]}', color="orange", m=m)
    add_marker(
        cords=user_cords[1], message=f'User-end {user_cords[1]}', color="purple", m=m)

    res = supabase.table('routes').select("*").execute()
    print(res)
    id_cords = {}
    for i in res.data:
        print(i)
        id_cords[i['id']] = [[i['source']['lng'], i['source']['lat']],
                             [i['destination']['lng'], i['destination']['lat']]]

        # coords.append([[i.soure['lat'], i.source['lng']]], [[i.destination['lat'], i.destination['lng']]]])

    for idx, coords in id_cords.items():
        # print(coords[i])
        route = client.directions(coordinates=coords,
                                  profile='foot-walking',
                                  format='geojson')

        route_steps = route['features'][0]['geometry']['coordinates']

        add_line(path=route, m=m)
        add_marker(
            cords=coords[0], message=f'Route-start {coords[0]}', color="green", m=m)
        add_marker(
            cords=coords[1], message=f'Route-end {coords[1]}', color="red", m=m)

        # src_route_start = client.directions(coordinates=[user_cords[0], route_steps[0]],
        #                           profile='foot-walking',
        #                           format='geojson')
        # des_route_end = client.directions(coordinates=[user_cords[1], route_steps[-1]],
        #                           profile='foot-walking',
        #                           format='geojson')
        # print(src_route_start["features"][0]["properties"]["segments"][0]["distance"], des_route_end["features"][0]["properties"]["segments"][0]["distance"])

        steps = np.array(route_steps)
        src_diff = np.sum(np.abs(steps-ucords[0]), axis=1)
        des_diff = np.sum(np.abs(steps-ucords[1]), axis=1)

        min_src = np.argmin(src_diff)
        min_des = np.argmin(des_diff)

        srcd[src_diff[min_src]] = [steps[min_src], idx]
        desd[des_diff[min_des]] = [steps[min_src], idx]

    # print(srcd.keys())
    # print(desd.keys())
    vids = []
    for i in range(min(3, len(srcd))):
        min_src_key = min(list(srcd.keys()))
        min_src_cord = srcd[min_src_key][0]
        vids.append(srcd[min_src_key][1])
        min_des_key = min(list(desd.keys()))
        min_des_cord = desd[min_des_key]

        del srcd[min_src_key]
        del desd[min_des_key]

        # print(srcd)
        # print(desd)
        add_marker(cords=min_src_cord,
                   message=f"Minsrc- {min_src_cord}", color="black", m=m)

    return jsonify(m.to_json(), vids), 200


@app.route('/trip_map', methods=['GET', 'POST'])
def trip_map():
    client = ors.Client(key='5b3ce3597851110001cf62485a84c527d2744fd9b08eb7b6ce3ad467')

    data = request.get_json()
    src = data.get('source')
    des = data.get('destination')

    trip_cords = [[src['lng'], src['lat']], [des['lng'], des['lat']]]

    m = folium.Map(location=list(reversed(trip_cords[0])), tiles="cartodbpositron", zoom_start=13)
    trip_route = client.directions(coordinates=trip_cords,
                          profile='foot-walking',
                          format='geojson')

    # add user line and markers
    add_line(path=trip_route, m=m)
    add_marker(cords=trip_cords[0], message=f'User-start {trip_cords[0]}', color="green", m=m)
    add_marker(cords=trip_cords[1], message=f'User-end {trip_cords[1]}', color="red",m=m)

    return m.to_json(), 200