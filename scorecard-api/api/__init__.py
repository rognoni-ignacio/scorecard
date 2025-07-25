from flask import Flask
from flask_cors import CORS
from .courses import courses_bp  # Now relative import works

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173", "https://rognoni-ignacio.github.io"])

# Register the blueprint
app.register_blueprint(courses_bp)

# Expose `app` for Vercel (don't call app.run())