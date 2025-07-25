from flask import Flask
from flask_cors import CORS
from app_modules.courses import courses_bp

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173", "https://rognoni-ignacio.github.io"])

# Register blueprints
app.register_blueprint(courses_bp)

# Do NOT call app.run(); Vercel will handle the server
