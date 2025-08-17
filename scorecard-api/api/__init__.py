import os
from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy

# Global extensions (not bound to app yet)
db = SQLAlchemy()
jwt = JWTManager()


def create_app():
    load_dotenv()

    app = Flask(__name__)

    # --- Config ---
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///scorecard.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
    app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")

    # --- Init extensions ---
    db.init_app(app)
    jwt.init_app(app)
    CORS(app, origins=["http://localhost:5173", "https://rognoni-ignacio.github.io"])

    # --- Register blueprints ---
    from .auth import auth_bp
    from .courses import courses_bp
    from .external_courses import external_courses_bp
    from .rounds import rounds_bp

    app.register_blueprint(auth_bp)
    app.register_blueprint(courses_bp)
    app.register_blueprint(external_courses_bp)
    app.register_blueprint(rounds_bp)

    # --- Import models and create tables ---
    with app.app_context():
        from .models.user import User
        from .models.round import Round

        db.create_all()

    return app


# WSGI entrypoint
app = create_app()
