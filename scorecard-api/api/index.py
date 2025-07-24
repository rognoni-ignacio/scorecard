from flask import Flask, jsonify
from flask_cors import CORS
from courses import courses_bp

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173", "https://rognoni-ignacio.github.io"])

app.register_blueprint(courses_bp)

if __name__ == "main":
    app.run()
