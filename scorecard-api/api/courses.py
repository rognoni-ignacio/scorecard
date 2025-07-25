from flask import Blueprint, jsonify
from .data.courses import COURSES

courses_bp = Blueprint("courses", __name__, url_prefix="/api/courses")


@courses_bp.route("/", methods=["GET"])
def get_courses():
    return jsonify(
        {
            "courses": [
                {"id": course["id"], "name": course["name"]}
                for course in COURSES.values()
            ]
        }
    )


@courses_bp.route("/<int:course_id>", methods=["GET"])
def get_course(course_id):
    course = COURSES.get(course_id)
    if not course:
        return jsonify({"error": "Course not found"}), 404
    return jsonify(course)
