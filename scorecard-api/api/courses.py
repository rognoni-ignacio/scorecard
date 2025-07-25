from flask import Blueprint, jsonify, request
import os
import requests
from dotenv import load_dotenv
from .data.courses import COURSES

load_dotenv()

courses_bp = Blueprint("courses", __name__, url_prefix="/api/courses")

GOLF_API_URL = "https://api.golfcourseapi.com/v1"
API_KEY = os.getenv("GOLF_API_KEY")


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


@courses_bp.route("/api-search", methods=["GET"])
def get_courses_api():
    try:
        search_query = request.args.get("q", "")
        if not search_query:
            return jsonify([])

        response = requests.get(
            f"{GOLF_API_URL}/search",
            params={"search_query": search_query},
            headers={"Authorization": f"Key {API_KEY}"},
        )
        response.raise_for_status()
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        print(f"API request failed: {e}")
        return jsonify({"error": "Failed to fetch courses from external API"}), 500
