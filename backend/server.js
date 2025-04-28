const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let courses = [
  { id: 1, name: 'Tietokannats', grade: '4' },
  { id: 2, name: 'Ohjelmistotuotanto', grade: '5' }
];

app.get('/courses', (req, res) => {
  res.json(courses);
});

app.post('/courses', (req, res) => {
  const { name, grade } = req.body;
  const newCourse = {
    id: Date.now(),
    name,
    grade
  };
  courses.push(newCourse);
  res.status(201).json(newCourse);
});

app.put('/courses/:id', (req, res) => {
  const { id } = req.params;
  const { name, grade } = req.body;
  const course = courses.find(c => c.id == id);
  if (course) {
    course.name = name;
    course.grade = grade;
    res.json(course);
  } else {
    res.status(404).json({ message: 'Kurssia ei löydy' });
  }
});

app.delete('/courses/:id', (req, res) => {
  const { id } = req.params;
  courses = courses.filter(c => c.id != id);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});