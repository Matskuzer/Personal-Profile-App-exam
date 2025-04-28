import React, { useState, useEffect } from 'react';

function App() {
  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState('');
  const [grade, setGrade] = useState('');
  const [editingCourse, setEditingCourse] = useState(null);

  const API_URL = 'http://localhost:5000/courses';

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setCourses(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingCourse) {
      await fetch(`${API_URL}/${editingCourse.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: courseName, grade }),
      });
      setEditingCourse(null);
    } else {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: courseName, grade }),
      });
    }
    setCourseName('');
    setGrade('');
    fetchCourses();
  };

  const handleEdit = (course) => {
    setCourseName(course.name);
    setGrade(course.grade);
    setEditingCourse(course);
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    fetchCourses();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Matias Nisula - NTIS22K</h1> {/* Vaihda tähän oma nimi ja ryhmä */}
      <h2>Kurssit</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            {course.name} - Arvosana: {course.grade}
            <button onClick={() => handleEdit(course)}>Muokkaa</button>
            <button onClick={() => handleDelete(course.id)}>Poista</button>
          </li>
        ))}
      </ul>

      <h2>{editingCourse ? 'Muokkaa Kurssia' : 'Lisää Uusi Kurssi'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Kurssin nimi"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Arvosana"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          required
        />
        <button type="submit">{editingCourse ? 'Update' : 'Lisää'}</button>
      </form>
    </div>
  );
}

export default App;
