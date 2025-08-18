import os
from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy.pool import NullPool
from sqlalchemy import text

db = SQLAlchemy()
jwt = JWTManager()
migrate = Migrate()


def _normalize_pg_url(url: str) -> str:
    if url.startswith("postgres://"):
        url = url.replace("postgres://", "postgresql+psycopg://", 1)
    if url.startswith("postgresql+psycopg://") and "sslmode=" not in url:
        url += ("&" if "?" in url else "?") + "sslmode=require"
    return url


def create_app():
    load_dotenv()
    app = Flask(__name__)

    # DB config
    raw_db_url = os.getenv("DATABASE_URL", "sqlite:///scorecard.db")
    db_url = _normalize_pg_url(raw_db_url)
    app.config["SQLALCHEMY_DATABASE_URI"] = db_url
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {
        "poolclass": NullPool,
        "pool_pre_ping": True,
        "connect_args": (
            {"sslmode": "require"} if db_url.startswith("postgresql+psycopg://") else {}
        ),
    }

    # Auth config
    app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
    app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")

    # Bind extensions FIRST
    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)

    # Now import blueprints/models (AFTER init_app)
    from .auth import auth_bp
    from .courses import courses_bp
    from .external_courses import external_courses_bp
    from .rounds import rounds_bp

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

    # Optional: quick health check
    @app.get("/health")
    def health():
        db.session.execute(text("SELECT 1"))
        return {"ok": True}

    return app


app = create_app()
