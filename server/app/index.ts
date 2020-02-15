import express = require("express");

let restaurants = require("../db/restaurants.json");

const app: express.Application = express();
const port = process.env.PORT || 9000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, content-type, Content-Type, x-auth"
  );
  next();
});

app.get("/", (req, res) => res.send("Restaurants API"));

app.get("/restaurants", (req, res) => res.send(restaurants));

app.listen(port, () => console.log(`Listening on port ${port}!`));
