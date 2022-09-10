// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", (req, res) => {
  const { date } = req.params.date;
  var unixValue;
  var utc;
  var utcValue;
  var json;

  if (date == undefined) {
    utc = new Date();
    utcValue = utc.toUTCString();
    unixValue = new Date(utc).valueOf();
    json = { unix: parseInt(unixValue), utc: utcValue };
  } else {
    if (date.includes("-")) {
      utc = new Date(date);
      utcValue = utc.toUTCString();
      unixValue = utc.valueOf();
    } else {
      const dateInt = parseInt(date);
      unixValue = dateInt;
      utc = new Date(unixValue * 1);
      utcValue = utc.toUTCString();
    }
    if (utcValue == "Invalid Date") {
      json = { error: "Invalid Date" };
    } else {
      json = { unix: parseInt(unixValue), utc: utcValue };
    }
  }

  res.json(json);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
