from flask import Blueprint, jsonify, request
import os
import requests
from dotenv import load_dotenv
from .mappers.course_mapper import (
    map_golfcourseapi_to_course,
    map_golfcourseapi_course_search_to_summary,
)

load_dotenv()

external_courses_bp = Blueprint(
    "external_courses", __name__, url_prefix="/api/external/courses"
)

GOLF_API_URL = "https://api.golfcourseapi.com/v1"
API_KEY = os.getenv("GOLF_API_KEY")


@external_courses_bp.route("/search", methods=["GET"])
def search_courses():
    try:
        search_query = request.args.get("q", "")
        if not search_query:
            return jsonify({"courses": []})

        response = requests.get(
            f"{GOLF_API_URL}/search",
            params={"search_query": search_query},
            headers={"Authorization": f"Key {API_KEY}"},
        )
        response.raise_for_status()
        courses = response.json().get("courses", [])
        mapped_courses = [
            map_golfcourseapi_course_search_to_summary(c).to_dict() for c in courses
        ]
        return jsonify({"courses": mapped_courses})
    except requests.exceptions.RequestException as e:
        print(f"API request failed: {e}")
        return jsonify({"error": "Failed to fetch courses from external API"}), 500


@external_courses_bp.route("/<int:course_id>", methods=["GET"])
def get_course(course_id):
    try:
        response = requests.get(
            f"{GOLF_API_URL}/courses/{course_id}",
            headers={"Authorization": f"Key {API_KEY}"},
        )
        response.raise_for_status()
        api_data = response.json().get("course")
        course = map_golfcourseapi_to_course(api_data)
        return jsonify(course.to_dict())
    except requests.exceptions.RequestException as e:
        print(f"API request failed: {e}")
        return (
            jsonify(
                {
                    "error": f"Failed to fetch course with id: {course_id} from external API"
                }
            ),
            500,
        )
