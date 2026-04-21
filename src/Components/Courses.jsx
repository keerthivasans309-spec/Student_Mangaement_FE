import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./Layout";

export default function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:8080/course/getCourse");
      setCourses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout>
    <div className="container mt-5">
      <h3 className="text-center mb-4">Courses</h3>

      <div className="row">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div className="col-md-4 mb-3" key={course.courseId}>
              <div className="card shadow h-100">
                <div className="card-body">
                  <h5>{course.courseName}</h5>

                  <p><strong>Instructor:</strong> {course.handleStaff}</p>
                  <p><strong>Start:</strong> {course.courseStartDate}</p>
                  <p><strong>End:</strong> {course.courseEndDate}</p>
                  <p><strong>Status:</strong> {course.status}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-danger">No courses found</p>
        )}
      </div>
    </div>
    </Layout>
  );
}