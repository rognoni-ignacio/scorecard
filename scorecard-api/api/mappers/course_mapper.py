from ..models.course import Course
from ..models.course_summary import CourseSummary


def map_golfcourseapi_course_search_to_summary(api_data):
    return CourseSummary(id=api_data.get("id"), name=api_data.get("course_name"))


def map_golfcourseapi_to_course(api_data):
    holes = [
        {"number": idx + 1, "par": h.get("par", 0)}
        for idx, h in enumerate(api_data.get("holes", []))
    ]
    return Course(id=api_data.get("id"), name=api_data.get("course_name"), holes=holes)
