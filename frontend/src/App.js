import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [courses, setCourses] = useState([]);
  const [newCourseName, setNewCourseName] = useState("");
  const [newCourseGrade, setNewCourseGrade] = useState("");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const response = await fetch("http://localhost:3001/courses");
    const data = await response.json();
    setCourses(data);
  };

  const addCourse = async () => {
    if (!newCourseName || !newCourseGrade) return;

    await fetch("http://localhost:3001/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newCourseName, grade: Number(newCourseGrade) }),
    });

    setNewCourseName("");
    setNewCourseGrade("");
    fetchCourses();
  };

  const editCourse = async (id) => {
    const newGrade = prompt("Anna uusi arvosana:");
    if (newGrade !== null) {
      await fetch(`http://localhost:3001/courses/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ grade: Number(newGrade) }),
      });
      fetchCourses();
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Matias Nisula</h1>
        <h2>NTIS22K</h2>

        <h3>Omat kurssit</h3>
        <table>
          <thead>
            <tr>
              <th>Kurssin nimi</th>
              <th>Arvosana</th>
              <th>Muokkaa</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td>{course.name}</td>
                <td>{course.grade}</td>
                <td>
                  <button className="edit-button" onClick={() => editCourse(course.id)}>
                    Muokkaa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="form">
          <div>
            <label>Kurssin nimi</label>
            <input
              type="text"
              value={newCourseName}
              onChange={(e) => setNewCourseName(e.target.value)}
              placeholder="Kurssin nimi"
            />
          </div>
          <div>
            <label>Arvosana</label>
            <input
              type="number"
              value={newCourseGrade}
              onChange={(e) => setNewCourseGrade(e.target.value)}
              placeholder="Arvosana"
            />
          </div>
          <button onClick={addCourse}>Lisää kurssi</button>
        </div>
      </div>
    </div>
  );
}

export default App;
