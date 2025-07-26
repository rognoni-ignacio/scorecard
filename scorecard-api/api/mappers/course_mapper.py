from ..models.course import Course
from ..models.course_summary import CourseSummary


def map_golfcourseapi_course_search_to_summary(api_data):
    return CourseSummary(id=api_data.get("id"), name=api_data.get("course_name"))


def map_golfcourseapi_to_course(api_data):
    # Prefer first male tee, then first female tee, else empty
    tee = None
    if api_data.get("tees", {}).get("male"):
        tee = api_data["tees"]["male"][0]
    elif api_data.get("tees", {}).get("female"):
        tee = api_data["tees"]["female"][0]
    else:
        tee = None

    holes = []
    if tee and "holes" in tee:
        holes = [
            {"number": idx + 1, "par": h.get("par", 0)}
            for idx, h in enumerate(tee["holes"])
        ]

    return Course(id=api_data.get("id"), name=api_data.get("course_name"), holes=holes)
