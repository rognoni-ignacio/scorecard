import uuid
import pytest
from api import app as flask_app


@pytest.fixture
def client():
    flask_app.config["JWT_SECRET_KEY"] = "test"
    flask_app.config["SECRET_KEY"] = "test"
    with flask_app.test_client() as client:
        yield client


def create_user(client, email):
    payload = {
        "name": "Test User",
        "email": email,
        "password": "password123",
    }
    response = client.post("/api/auth/signup", json=payload)
    assert response.status_code == 201


def test_login_sets_refresh_cookie_and_refresh_returns_token(client):
    email = f"{uuid.uuid4()}@example.com"
    create_user(client, email)
    login_resp = client.post(
        "/api/auth/login", json={"email": email, "password": "password123"}
    )
    assert login_resp.status_code == 200
    assert "refresh_token=" in login_resp.headers.get("Set-Cookie", "")
    access_token = login_resp.get_json()["access_token"]
    assert access_token

    refresh_resp = client.post("/api/auth/refresh")
    assert refresh_resp.status_code == 200
    assert "access_token" in refresh_resp.get_json()
    assert "refresh_token=" in refresh_resp.headers.get("Set-Cookie", "")

    logout_resp = client.post("/api/auth/logout")
    assert logout_resp.status_code == 200
    assert "refresh_token=" in logout_resp.headers.get("Set-Cookie", "")
