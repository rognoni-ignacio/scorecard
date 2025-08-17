# api/__init__.py
import os
from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
jwt = JWTManager()


def create_app():
    load_dotenv()

    # Detect serverless (set SERVERLESS_ENV=true in your prod env)
    SERVERLESS = os.getenv("SERVERLESS_ENV", "").lower() == "true"

    # In serverless, force a writable instance path; /var/task is read-only
    app = Flask(__name__, instance_path="/tmp" if SERVERLESS else None)

    # Choose DB URL:
    # - If DATABASE_URL is set (e.g., Postgres), use that.
    # - Else, use SQLite in /tmp for serverless; local file for dev.
    database_url = os.getenv("DATABASE_URL")
    if not database_url:
        database_url = (
            "sqlite:////tmp/scorecard.db" if SERVERLESS else "sqlite:///scorecard.db"
        )

    app.config.update(
        SQLALCHEMY_DATABASE_URI=database_url,
        SQLALCHEMY_TRACK_MODIFICATIONS=False,
        SECRET_KEY=os.getenv("SECRET_KEY", "dev-only"),
        JWT_SECRET_KEY=os.getenv("JWT_SECRET_KEY", "dev-only-jwt"),
    )

    # Init extensions FIRST
    db.init_app(app)
    jwt.init_app(app)
    CORS(app, origins=["http://localhost:5173", "https://rognoni-ignacio.github.io"])

    # Import models/blueprints AFTER init_app to avoid timing issues
    from .models.user import User
    from .models.round import Round

    from .auth import auth_bp
    from .courses import courses_bp
    from .external_courses import external_courses_bp
    from .rounds import rounds_bp

    # Register blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(courses_bp)
    app.register_blueprint(external_courses_bp)
    app.register_blueprint(rounds_bp)

    # For SQLite, create tables on startup (safe to call repeatedly)
    if database_url.startswith("sqlite"):
        with app.app_context():
            db.create_all()

    return app


# If your platform requires a global app object, keep this line.
# Otherwise, remove it and let your handler call create_app() on cold start.
app = create_app()
