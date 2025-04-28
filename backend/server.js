const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 3001;
const DATA_FILE = "courses.json";

app.use(cors());
app.use(express.json());

const readData = () => {
  if (!fs.existsSync(DATA_FILE)) return [];
  const data = fs.readFileSync(DATA_FILE);
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

app.get("/courses", (req, res) => {
  res.json(readData());
});

app.post("/courses", (req, res) => {
  const courses = readData();
  const newCourse = {
    id: Date.now(),
    name: req.body.name,
    grade: req.body.grade,
  };
  courses.push(newCourse);
  writeData(courses);
  res.status(201).json(newCourse);
});

app.put("/courses/:id", (req, res) => {
  const courses = readData();
  const id = Number(req.params.id);
  const updatedCourses = courses.map((course) =>
    course.id === id ? { ...course, grade: req.body.grade } : course
  );
  writeData(updatedCourses);
  res.json({ message: "Course updated" });
});

app.delete("/courses/:id", (req, res) => {
  const courses = readData();
  const id = Number(req.params.id);
  const filteredCourses = courses.filter((course) => course.id !== id);
  writeData(filteredCourses);
  res.json({ message: "Course deleted" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
