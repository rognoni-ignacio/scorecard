import os
from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy.pool import NullPool

db = SQLAlchemy()
jwt = JWTManager()
migrate = Migrate()

from .auth import auth_bp
from .courses import courses_bp
from .external_courses import external_courses_bp
from .rounds import rounds_bp


def _normalize_pg_url(url: str) -> str:
    # - Neon/Vercel may give `postgres://...` → SQLAlchemy psycopg3 wants `postgresql+psycopg://...`
    # - Ensure sslmode=require (Neon requires TLS)
    if url.startswith("postgres://"):
        url = url.replace("postgres://", "postgresql+psycopg://", 1)
    if url.startswith("postgresql+psycopg://") and "sslmode=" not in url:
        url += ("&" if "?" in url else "?") + "sslmode=require"
    return url


def create_app():
    load_dotenv()

    app = Flask(__name__)

    # Database
    raw_db_url = os.getenv("DATABASE_URL", "sqlite:///scorecard.db")
    db_url = _normalize_pg_url(raw_db_url)

    app.config["SQLALCHEMY_DATABASE_URI"] = db_url
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    # Serverless-friendly engine settings: no client pooling; rely on Neon’s PgBouncer pooled endpoint
    app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {
        "poolclass": NullPool,
        "pool_pre_ping": True,
        # connect_args are passed through to psycopg when applicable
        "connect_args": (
            {"sslmode": "require"} if db_url.startswith("postgresql+psycopg://") else {}
        ),
    }

    # Auth configuration
    app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
    app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")

    # Initialize application
    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)

    # CORS
    CORS(
        app,
        origins=["http://localhost:5173", "https://rognoni-ignacio.github.io"],
        allow_headers=["Content-Type", "Authorization"],
    )

    # Register routes
    app.register_blueprint(auth_bp)
    app.register_blueprint(courses_bp)
    app.register_blueprint(external_courses_bp)
    app.register_blueprint(rounds_bp)

    return app


app = create_app()
