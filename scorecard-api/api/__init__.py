from flask import Flask
from flask_cors import CORS
from .courses import courses_bp
from .external_courses import external_courses_bp

def create_app():
    """
    Application factory for Flask app.
    """
    app = Flask(__name__)
    CORS(app, origins=["http://localhost:5173", "https://rognoni-ignacio.github.io"])
    app.register_blueprint(courses_bp)
    app.register_blueprint(external_courses_bp)
    return app
