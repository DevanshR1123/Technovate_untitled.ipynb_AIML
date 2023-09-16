import requests
import openrouteservice as ors
import folium 
import operator
from functools import reduce
from supabase import create_client, Client
from dotenv import load_dotenv
import os

load_dotenv()
url: str = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
key: str = os.getenv("NEXT_PUBLIC_SUPABASE_ANON_KEY")
supabase: Client = create_client(url, key)


def get_location_info(loc, key='CtAFAb6HhxbTJn5LIDknMagdoJpDMWye'):
    url = 'https://www.mapquestapi.com/geocoding/v1/address?key='

    main_url = url+key+'&location='+loc

    try:
        r = requests.get(main_url)
        data = r.json()
        location_info = data['results'][0]['locations'][0]

        lat, long = location_info['latLng']['lat'],location_info['latLng']['lng']
    except:
        lat, long = None, None

    return [lat, long]


def add_marker(cords, message, color):
    folium.Marker(
        location=list(reversed(cords)),
        popup=message,
        icon=folium.Icon(color=color),
        ).add_to(m)
    return

def add_line(path, color="blue"):
    folium.PolyLine(locations=[list(reversed(coord)) for coord in path['features'][0]['geometry']['coordinates']], color=color).add_to(m)
    return

def get_routes_info(source,destination,source_lat,source_long,destination_lat,destination_long):
    client = ors.Client(key='5b3ce3597851110001cf62480f73447f67a2444fa6cc065b11091e9f')
    min_sum = 0
    src_minval=99
    des_minval=99
    m = folium.Map(location=list(reversed([source_long,source_lat])), tiles="cartodbpositron", zoom_start=13)
    
    user_cords = [[source_long,source_lat], [destination_long, destination_lat]]
    user_route = client.directions(coordinates=user_cords,
                          profile='car-driving',
                          format='geojson')
    
    # user_route_steps = user_route['features'][0]['geometry']['coordinates']
    ucords = np.array(user_cords)  
    
    add_line(path=user_route)
    add_marker(cords=user_cords[0], message=f'User-start {user_cords[0]}', color="orange")
    add_marker(cords=user_cords[1], message=f'User-end {user_cords[1]}', color="purple") 
    
    all_routes = supabase.table('routes').select('*').execute()
    top_3_routes = []
    for n in range(3):
        for i in range(len(coords)):
            print(coords[i])
            route = client.directions(coordinates=coords[i],
                                      profile='foot-walking',
                                      format='geojson')

            route_steps = route['features'][0]['geometry']['coordinates']

            add_line(path=route)
            add_marker(cords=coords[i][0], message=f'Route-start {coords[i][0]}', color="green")
            add_marker(cords=coords[i][1], message=f'Route-end {coords[i][1]}', color="red")

            src_route_start = client.directions(coordinates=[user_cords[0], route_steps[0]],
                                      profile='foot-walking',
                                      format='geojson')
            des_route_end = client.directions(coordinates=[user_cords[1], route_steps[-1]],
                                      profile='foot-walking',
                                      format='geojson')
            print(src_route_start["features"][0]["properties"]["segments"][0]["distance"], des_route_end["features"][0]["properties"]["segments"][0]["distance"])

            steps = np.array(route_steps)
            src_diff = np.sum(np.abs(steps-ucords[0]),axis=1)
            des_diff = np.sum(np.abs(steps-ucords[1]),axis=1)

            add_line(path=route)
            add_marker(cords=coords[i][0], message=f'Route-start {coords[i][0]}', color="green")
            add_marker(cords=coords[i][1], message=f'Route-end {coords[i][1]}', color="red")

            min_src = np.argmin(src_diff)
            min_des = np.argmin(des_diff)

            if src_minval>src_diff[min_src]:
                src_minval = src_diff[min_src]
                min_src_cord = steps[min_src]
            if des_minval>des_diff[min_des]:
                des_minval = des_diff[min_des]
                min_des_cord = steps[min_des]
                
            add_marker(cords=min_src_cord, message=f"Minsrc- {min_src_cord}", color="black")
            add_marker(cords=min_des_cord, message=f"Mindes- {min_des_cord}", color="black")

            print(src_minval, des_minval, min_src_cord, min_des_cord)
        
    print(all_routes)
    

all_routes = supabase.table('routes').select('*').execute()
print(all_routes)
    
    
    
    