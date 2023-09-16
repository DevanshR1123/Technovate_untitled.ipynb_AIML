import requests

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