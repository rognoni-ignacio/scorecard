from datetime import datetime, timezone
from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required

from api import db
from .models.round import Round

rounds_bp = Blueprint("rounds", __name__, url_prefix="/api/rounds")


@rounds_bp.get("")
@jwt_required()
def list_rounds():
    user_id = int(get_jwt_identity())
    rounds = (
        Round.query.filter_by(user_id=user_id).order_by(Round.played_at.desc()).all()
    )
    return jsonify({"rounds": [r.to_dict() for r in rounds]}), 200


@rounds_bp.post("")
@jwt_required()
def create_round():
    data = request.get_json(silent=True) or {}
    name = (data.get("name") or "").strip()
    holes = data.get("holes") or []

    if not name or not isinstance(holes, list) or not holes:
        return jsonify({"error": "names and holes are required"}), 400

    total_par = sum(int(h.get("par", 0)) for h in holes)
    total_strokes = sum(int(h.get("strokes", 0)) for h in holes)

    round = Round()
    round.user_id = int(get_jwt_identity())
    round.course_id = data.get("course_id")
    round.name = name
    round.played_at = datetime.now(timezone.utc)
    round.holes = holes
    round.total_par = total_par
    round.total_strokes = total_strokes

    db.session.add(round)
    db.session.commit()

    return jsonify(round.to_dict()), 201
