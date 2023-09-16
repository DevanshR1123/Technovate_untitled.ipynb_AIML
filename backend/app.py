from backend import app
from flask import request, jsonify
from flask import Flask
from supabase import create_client, Client
from dotenv import load_dotenv
import os
from flask_cors import CORS
import requests


load_dotenv()
url: str = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
key: str = os.getenv("NEXT_PUBLIC_SUPABASE_ANON_KEY")
supabase: Client = create_client(url, key)


app = Flask(__name__)
CORS(app)
# app.config.from_object(config)


def get_location_info(loc, key='CtAFAb6HhxbTJn5LIDknMagdoJpDMWye'):
    url = 'https://www.mapquestapi.com/geocoding/v1/address?key=CtAFAb6HhxbTJn5LIDknMagdoJpDMWye'

    main_url = url+key+'&location='+loc

    try:
        r = requests.get(main_url)
        data = r.json()
        location_info = data['results'][0]['locations'][0]

        lat, long = location_info['latLng']['lat'], location_info['latLng']['lng']
    except:
        lat, long = None, None

    return [lat, long]


@app.post('/location-to-coordinates')
def location_to_coordinates():
    data = request.get_json()
    location = data.get('location')
    coordinates = get_location_info(location)
    return jsonify({'coordinates': coordinates})


if __name__ == '__main__':
    app.run(debug=True)
