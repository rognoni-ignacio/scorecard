from flask import Flask, Blueprint, jsonify
from flask_cors import CORS
from .data.courses import COURSES

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173", "https://rognoni-ignacio.github.io"])

courses_bp = Blueprint("courses", __name__, url_prefix="/api/courses")

@courses_bp.route("/", methods=["GET"])
def get_courses():
    return jsonify(
        {"courses": [{"id": c["id"], "name": c["name"]} for c in COURSES.values()]}
    )

@courses_bp.route("/<int:course_id>", methods=["GET"])
def get_course(course_id):
    course = COURSES.get(course_id)
    if not course:
        return jsonify({"error": "Course not found"}), 404
    return jsonify(course)

app.register_blueprint(courses_bp)