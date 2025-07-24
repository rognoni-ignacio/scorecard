from flask import Flask, jsonify
from flask_cors import CORS
from data.courses import COURSES

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173", "https://rognoni-ignacio.github.io"])


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route("/test-connection", methods=["GET"])
def test_connection():
    return jsonify(
        {
            "status": "success",
            "message": "Connection between React and Flask is working!",
            "timestamp": "2024-01-01T00:00:00Z",
        }
    )


@app.route("/courses", methods=["GET"])
def get_courses():
    return jsonify(
        {
            "courses": [
                {"id": 1, "name": "Demo Club (9 Holes)"},
                {"id": 2, "name": "Demo Club (18 Holes)"},
            ],
        }
    )


@app.route("/courses/<int:course_id>", methods=["GET"])
def get_course(course_id):
    course = COURSES.get(course_id)
    if not course:
        return jsonify({"error": "Course not found"}), 404
    return jsonify(course)
