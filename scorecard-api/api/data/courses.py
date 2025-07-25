from typing import Dict
from ..models.course import Course

COURSES: Dict[int, Course] = {
    1: Course(
        id=1,
        name="Demo Club (9 Holes)",
        holes=[
            {"number": 1, "par": 4},
            {"number": 2, "par": 3},
            {"number": 3, "par": 5},
            {"number": 4, "par": 4},
            {"number": 5, "par": 4},
            {"number": 6, "par": 3},
            {"number": 7, "par": 5},
            {"number": 8, "par": 4},
            {"number": 9, "par": 4},
        ],
    ),
    2: Course(
        id=2,
        name="Demo Club (18 Holes)",
        holes=[
            {"number": 1, "par": 4},
            {"number": 2, "par": 4},
            {"number": 3, "par": 5},
            {"number": 4, "par": 3},
            {"number": 5, "par": 4},
            {"number": 6, "par": 5},
            {"number": 7, "par": 3},
            {"number": 8, "par": 4},
            {"number": 9, "par": 4},
            {"number": 10, "par": 5},
            {"number": 11, "par": 4},
            {"number": 12, "par": 3},
            {"number": 13, "par": 4},
            {"number": 14, "par": 5},
            {"number": 15, "par": 4},
            {"number": 16, "par": 3},
            {"number": 17, "par": 4},
            {"number": 18, "par": 5},
        ],
    ),
    3: Course(
        id=3,
        name="Golf Negralejo (9 hoyos)",
        holes=[
            {"number": 1, "par": 3},
            {"number": 2, "par": 3},
            {"number": 3, "par": 3},
            {"number": 4, "par": 3},
            {"number": 5, "par": 3},
            {"number": 6, "par": 3},
            {"number": 7, "par": 4},
            {"number": 8, "par": 3},
            {"number": 9, "par": 4},
        ],
    ),
}
