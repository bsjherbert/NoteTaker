const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3000;
const fs = require("fs");
const app = express();
const notes = require("./db/db.json");

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

//GET route
app.get("/api/notes", (req, res) => res.json(notes));

//POST route
app.post("/api/notes", (req, res) => {
  const newNote = req.body;
  newNote.id = notes.length;
  notes.push(newNote);
  fs.writeFile("./db/db.json", JSON.stringify(notes), () => {
    res.json(newNote)
  });
});

//DELETE route
app.delete("/api/notes/:id", (req, res) => {
  //this is where we will pick up 
});


//Listener
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});