from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


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
