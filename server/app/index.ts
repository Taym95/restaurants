import express = require("express");
const path = require("path");

let restaurants = require("../db/restaurants.json");

const app: express.Application = express();
const port = process.env.PORT || 9000;
app.use(express.static(path.join(__dirname, "../../build")));

const topRestaurants = restaurant =>
  (restaurant.sortingValues.topRestaurant =
    restaurant.sortingValues.distance * restaurant.sortingValues.popularity +
    restaurant.sortingValues.ratingAverage);

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

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../../build", "index.html"));
});

app.get("/restaurants", (req, res) => {
  restaurants.restaurants.forEach(topRestaurants);
  res.send(restaurants);
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
