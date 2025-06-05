const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 3002;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const filePath = path.join(__dirname, "data", "students.json");

// addFileShow
app.get("/", (req, res) => {
  res.render("addStudent", { message: null });
});

// Handle submit form
app.post("/add", (req, res) => {
  const { name, age, course, email } = req.body;

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) return res.send("Error reading file ");

    const students = JSON.parse(data);
    students.push({ name, age, course, email });

    // json("data", replacer, space);
    fs.writeFile(filePath, JSON.stringify(students, null, 2), (err) => {
      if (err) return res.send("Error data ");
      res.render("addStudent", { message: "Student added" });
    });
  });
});

//show students
app.get("/search", (req, res) => {
  const searchedName = req.query.name?.toLowerCase();

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) return res.send("Error reading file");

    const students = JSON.parse(data);
    let student = null;

    if (searchedName) {
      student = students.find((s) => s.name.toLowerCase() === searchedName);
    }

    res.render("search", { student, searchedName });
  });
});

app.listen(port, () =>
  console.log(`App listening on port http://localhost:${port}`)
);
