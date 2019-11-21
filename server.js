var express = require("express");
var path = require("path");
var PORT = process.env.PORT || 6000;
var fs = require("fs");
var app = express()

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());


app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
  });

  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });