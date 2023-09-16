from dotenv import load_dotenv
import os

load_dotenv()

# Access the secret key from the environment variables
secret_key = os.getenv("SECRET_KEY")


class config():
    SECRET_KEY = secret_key