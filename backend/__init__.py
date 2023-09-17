from flask import Flask
from backend.config import config
from supabase import create_client, Client
from dotenv import load_dotenv
import os
from flask_cors import CORS

load_dotenv()
url: str = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
key: str = os.getenv("NEXT_PUBLIC_SUPABASE_ANON_KEY")
supabase: Client = create_client(url, key)


app = Flask(__name__)
app.config.from_object(config)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

from backend.users import routes


# def create_app():
#     app = Flask(__name__)
#     app.config.from_object(config)
#     return app
