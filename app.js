const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const port = 3007;

app.set("view engine", "ejs");

const file_path = path.join(__dirname, "data", "students.json");

app.get("/", (req, res) => {
  const searchedName = req.query.name?.toLowerCase();

  fs.readFile(file_path, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Server Error");
    }
    const students = JSON.parse(data);
    let student = null;

    if (searchedName) {
      student = students.find((s) => s.name.toLowerCase() === searchedName);
    }
    res.render("index", { student, searchedName });
  });
});
app.listen(port, () =>
  console.log(`Example app listening on port http://localhost:${port}`)
);
