import pytest
from api import app as flask_app
from unittest.mock import patch, MagicMock


@pytest.fixture
def client():
    with flask_app.test_client() as client:
        yield client


@pytest.fixture
def make_mock_courses():
    mock_course = MagicMock()
    mock_course.id = 1
    mock_course.name = "Test Course"
    mock_course.to_dict.return_value = {"id": 1, "name": "Test Course"}
    return {1: mock_course}


def test_get_courses(client, make_mock_courses):
    with patch("api.courses.COURSES", make_mock_courses):
        response = client.get("/api/courses/")
        assert response.status_code == 200
        data = response.get_json()
        assert isinstance(data, dict)
        assert "courses" in data
        assert isinstance(data["courses"], list)
        assert data["courses"][0]["id"] == 1
        assert data["courses"][0]["name"] == "Test Course"


def test_get_course_success(client, make_mock_courses):
    with patch("api.courses.COURSES", make_mock_courses):
        response = client.get("/api/courses/1")
        assert response.status_code == 200
        data = response.get_json()
        assert isinstance(data, dict)
        assert "id" in data
        assert "name" in data


def test_get_course_not_found(client):
    with patch("api.courses.COURSES", {}):
        response = client.get("/api/courses/1")
        assert response.status_code == 404
        data = response.get_json()
        assert "error" in data
