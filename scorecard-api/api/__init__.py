import os
from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
jwt = JWTManager()

from .courses import courses_bp
from .external_courses import external_courses_bp
from .auth import auth_bp


def create_app():
    load_dotenv()

    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///scorecard.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
    app.config["JWT_SECRET_KEY"] = "461mUZOpXm8T341wzMKYGlJi65dPAM-lEtYBea9D1ndDK9YTn34EiTkzF_0vEJb9XanODZ5_J8sUb_kDEYob2g"

    db.init_app(app)
    jwt.init_app(app)

    CORS(app, origins=["http://localhost:5173", "https://rognoni-ignacio.github.io"])

    app.register_blueprint(courses_bp)
    app.register_blueprint(external_courses_bp)
    app.register_blueprint(auth_bp)

    with app.app_context():
        from .models.user import User

        db.create_all()

    return app


app = create_app()
