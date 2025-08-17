import os
from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
jwt = JWTManager()

from .auth import auth_bp
from .courses import courses_bp
from .external_courses import external_courses_bp
from .rounds import rounds_bp


def create_app():
    load_dotenv()

    SERVERLESS = os.getenv("SERVERLESS_ENV", "").lower() == "true"

    # In serverless, point Flask's instance path to /tmp (which is writable)
    if SERVERLESS:
        app = Flask(__name__, instance_path="/tmp")
    else:
        app = Flask(__name__)

    database_url = os.getenv("DATABASE_URL")
    if not database_url:
        database_url = (
            "sqlite:////tmp/scorecard.db" if SERVERLESS else "sqlite:///scorecard.db"
        )

    app.config.update(
        SQLALCHEMY_DATABASE_URI=database_url,
        SQLALCHEMY_TRACK_MODIFICATIONS=False,
        SECRET_KEY=os.getenv("SECRET_KEY", "dev-only-change-me"),
        JWT_SECRET_KEY=os.getenv("JWT_SECRET_KEY", "dev-jwt-change-me"),
    )

    db.init_app(app)
    jwt.init_app(app)

    CORS(app, origins=["http://localhost:5173", "https://rognoni-ignacio.github.io"])

    app.register_blueprint(auth_bp)
    app.register_blueprint(courses_bp)
    app.register_blueprint(external_courses_bp)
    app.register_blueprint(rounds_bp)

    # Create tables on startup for SQLite only (safe to call multiple times)
    # This avoids trying to write under /var/task; we only touch /tmp or local file.
    if database_url.startswith("sqlite"):
        with app.app_context():
            from .models.user import User
            from .models.round import Round

            db.create_all()

    return app


app = create_app()
