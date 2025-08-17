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


def test_refresh_cookie_flow(client):
    email = f"{uuid.uuid4()}@example.com"
    create_user(client, email)
    login_resp = client.post(
        "/api/auth/login", json={"email": email, "password": "password123"}
    )
    assert login_resp.status_code == 200
    cookies = login_resp.headers.getlist("Set-Cookie")
    assert any("refresh_token_cookie=" in c for c in cookies)
    assert any("access_token_cookie=" in c for c in cookies)
    assert "user" in login_resp.get_json()

    refresh_resp = client.post("/api/auth/refresh")
    assert refresh_resp.status_code == 200
    cookies = refresh_resp.headers.getlist("Set-Cookie")
    assert any("refresh_token_cookie=" in c for c in cookies)
    assert any("access_token_cookie=" in c for c in cookies)

    logout_resp = client.post("/api/auth/logout")
    assert logout_resp.status_code == 200
    cookies = logout_resp.headers.getlist("Set-Cookie")
    assert any(c.startswith("refresh_token_cookie=;") for c in cookies)
    assert any(c.startswith("access_token_cookie=;") for c in cookies)
