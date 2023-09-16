from flask import Flask
from backend.config import config
from supabase import create_client, Client
from dotenv import load_dotenv
import os

load_dotenv()
url: str = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
key: str = os.getenv("NEXT_PUBLIC_SUPABASE_ANON_KEY")
supabase: Client = create_client(url, key)


app = Flask(__name__)
app.config.from_object(config)

from backend.users import routes


