from .. import db
from datetime import datetime, timezone


class Round(db.Model):
    __tablename__ = "rounds"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    course_id = db.Column(db.Integer, nullable=True)
    name = db.Column(db.String(255), nullable=True)
    played_at = db.Column(
        db.DateTime, default=datetime.now(timezone.utc), nullable=False
    )
    holes = db.Column(db.JSON, nullable=False)
    total_par = db.Column(db.Integer)
    total_strokes = db.Column(db.Integer)

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "course_id": self.course_id,
            "name": self.name,
            "played_at": self.played_at.isoformat(),
            "holes": self.holes,
            "total_par": self.total_par,
            "total_strokes": self.total_strokes,
        }
