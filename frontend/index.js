const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());

let tasks = [];
let nextTaskId = 1;

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {});

app.delete("/tasks/:id", (req, res) => {});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
