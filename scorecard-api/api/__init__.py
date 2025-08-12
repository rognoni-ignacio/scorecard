from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

from .courses import courses_bp
from .external_courses import external_courses_bp

db = SQLAlchemy()


def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///scorecard.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)
    CORS(app, origins=["http://localhost:5173", "https://rognoni-ignacio.github.io"])

    app.register_blueprint(courses_bp)
    app.register_blueprint(external_courses_bp)

    with app.app_context():
        from .models.user import User

        db.create_all()

    return app


app = create_app()
