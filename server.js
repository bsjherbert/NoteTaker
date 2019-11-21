const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 6000;
const fs = require("fs");
const app = express();
const notes = require("./db/db.json");

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());


app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "notes.html"));
  });

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
  });

app.get("/api/notes", (req, res) => res.json(notes));

app.post("/api/notes", (req, res) => {
  const newNote = req.body;
  newNote.id = notes.length;
  notes.push(newNote);
  fs.writeFile("./db/db.json", JSON.stringify(notes), ()=> {
    res.json(newNote)
  });
});