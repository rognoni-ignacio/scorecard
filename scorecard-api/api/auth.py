from sqlite3 import IntegrityError
from flask import Blueprint, jsonify, request
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    decode_token,
    get_jwt,
    get_jwt_identity,
    jwt_required,
)

from api import db
from .models.user import User


auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")


@auth_bp.post("/signup")
def signup():
    data = request.get_json(silent=True) or {}

    email = (data.get("email") or "").strip().lower()
    name = (data.get("name") or "").strip()
    password = data.get("password") or ""

    if not email or not name or not password:
        return jsonify({"error": "email, name, and password are required"}), 400
    if len(password) < 8:
        return jsonify({"error": "password must be at least 8 characters"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "email already registered"}), 409

    user = User()
    user.email = email
    user.name = name
    user.set_password(password)

    db.session.add(user)

    try:
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        return jsonify({"error": "email already registered"}), 409

    return jsonify(user.to_dict()), 201


@auth_bp.post("/login")
def login():
    data = request.get_json(silent=True) or {}
    email = (data.get("email") or "").strip().lower()
    password = data.get("password") or ""

    if not email or not password:
        return jsonify({"error": "email and password are required"}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({"error": "invalid credentials"}), 401

    additional_claims = {"email": user.email, "name": user.name}
    access_token = create_access_token(
        identity=str(user.id), additional_claims=additional_claims
    )
    refresh_token = create_refresh_token(
        identity=str(user.id), additional_claims=additional_claims
    )
    response = jsonify({"access_token": access_token, "user": user.to_dict()})
    response.set_cookie(
        "refresh_token",
        refresh_token,
        httponly=True,
        samesite="strict",
        path="/api/auth/refresh",
    )
    return response, 200


@auth_bp.get("/me")
@jwt_required()
def me():
    user_id = get_jwt_identity()
    user = User.query.get(int(user_id))
    if not user:
        return jsonify({"error": "user not found"}), 404
    return jsonify(user.to_dict()), 200


@auth_bp.post("/refresh")
def refresh():
    refresh_token = request.cookies.get("refresh_token")
    if not refresh_token:
        return jsonify({"error": "missing refresh token"}), 401
    try:
        decoded = decode_token(refresh_token)
    except Exception:
        return jsonify({"error": "invalid refresh token"}), 401
    identity = decoded["sub"]
    claims = decoded.get("claims", {})
    access_token = create_access_token(identity=identity, additional_claims=claims)
    new_refresh = create_refresh_token(identity=identity, additional_claims=claims)
    response = jsonify({"access_token": access_token})
    response.set_cookie(
        "refresh_token",
        new_refresh,
        httponly=True,
        samesite="strict",
        path="/api/auth/refresh",
    )
    return response, 200


@auth_bp.post("/logout")
def logout():
    response = jsonify({"message": "logout successful"})
    response.delete_cookie("refresh_token", path="/api/auth/refresh")
    return response, 200
