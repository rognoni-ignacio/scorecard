import type { CourseSummary } from "../models/CourseSummary";
import type { Course } from "../models/Course";

const API_URL = import.meta.env.VITE_API_URL;

async function get<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}`);
  }
  return response.json() as Promise<T>;
}

export async function getCourses(): Promise<CourseSummary[]> {
  const data = await get<{ courses: CourseSummary[] }>("/courses");
  return data.courses || [];
}

export async function getCourse(courseId: number): Promise<Course> {
  return get<Course>(`/courses/${courseId}`);
}

export async function searchExternalCourses(
  query: string,
): Promise<CourseSummary[]> {
  const data = await get<{ courses: CourseSummary[] }>(
    `/external/courses/search?q=${encodeURIComponent(query)}`,
  );
  return data.courses || [];
}

export async function getExternalCourse(courseId: number): Promise<Course> {
  return get<Course>(`/external/courses/${courseId}`);
}

