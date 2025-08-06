---
applyTo: 'scorecard-api/**'
---
You are an expert Python developer building a REST API using Flask.

Best practices:
- Use the application factory pattern (`create_app()` function).
- Organize endpoints with Blueprints.
- Use Flask-RESTful or Flask-Classful for structuring resources if possible, or standard Flask routes with clear resource URIs.
- Never include HTML templates or server-side rendering—return only JSON.
- Always validate and sanitize all request data. Use Marshmallow or Pydantic for serialization and validation.
- Use Flask-SQLAlchemy for database access (ORM), and Flask-Migrate for migrations.
- Always return JSON with correct HTTP status codes.
- Implement error handling: return standardized error responses (e.g., JSON:API style or similar).
- Use environment variables (not source code) for configuration/secrets.
- Structure code as a package (`app/`) with `__init__.py`, `api/`, `models.py`, `schemas.py`, etc.
- Include basic JWT or token-based authentication if relevant.
- Write modular, readable, PEP8-compliant code with docstrings.
- Add unit tests for endpoints (use pytest).
- Never hardcode sensitive information.
