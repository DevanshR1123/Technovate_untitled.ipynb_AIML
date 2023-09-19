import requests
import folium 
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

    return [long, lat]

def add_marker(cords, message, color, m):
    folium.Marker(
        location=list(reversed(cords)),
        popup=message,
        icon=folium.Icon(color=color),
        ).add_to(m)
    return

def add_line(path, m, color="blue"):
    folium.PolyLine(locations=[list(reversed(coord)) for coord in path['features'][0]['geometry']['coordinates']], color=color).add_to(m)
    return

def add_marker_to_feature_collection(cords, message, color, feature_collection):
    feature = {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [cords[1], cords[0]]
        },
        "properties": {
            "marker-color": color,
            "marker-symbol": "circle",
            "marker-size": "medium",
            "marker-description": message
        }
    }
    # feature = {
    #     "type": "Feature",
    #     "geometry": {
    #         "type": "Point",
    #         "coordinates": [cords[1], cords[0]]  # Note the order reversal here
    #     },
    #     "properties": {
    #         "title": message,
    #         "marker-color":color
    #     }
    # }
    feature_collection["features"].append(feature)

def add_line_to_feature_collection(path, feature_collection, color="#32f0e3", routeid="user_route"):
    feature = {
        "type": "Feature",
        "geometry": {
            "type": "LineString",
            "coordinates": [[coord[1], coord[0]] for coord in path['features'][0]['geometry']['coordinates']]
        },
        "properties": {
            "stroke": color,
            "stroke-width": 3
        }
    }
    # feature = {
    #     "type": "Feature",
    #     "geometry": {
    #         "type": "LineString",
    #         "coordinates": [[coord[1], coord[0]] for coord in path['features'][0]['geometry']['coordinates']]  # Order reversal
    #     },
    #     "properties": {
    #         "stroke":color,
    #         "title":routeid
    #     }
    # }
    feature_collection["features"].append(feature)
