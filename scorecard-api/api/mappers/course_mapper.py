from ..models.course import Course


def map_golfcourseapi_course_search_to_course(api_data):
    return Course(
        id=api_data.get("id"),
        name=api_data.get("course_name") or api_data.get("name"),
        holes=api_data.get("holes", []),
    )
