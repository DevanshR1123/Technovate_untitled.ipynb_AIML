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
