const express = require("express");
const bodyParser = require("body-parser");
const generateId = require("./lib/generate-id");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const path = require("path");

app.set("port", process.env.PORT || 3000);
app.locals.title = "Pizza Express";

app.get("/", (request, response) => {
  response.render("index");
});

app.get('/pizzas/:id', (request, response) => {
  var pizza = app.locals.pizzas[request.params.id];

  response.render('pizza', { pizza: pizza });
});

app.post("/pizzas", (request, response) => {
  if (!request.body.pizza) { return response.sendStatus(400); }

  var id = generateId();

  app.locals.pizzas[id] = request.body.pizza;

  response.redirect("/pizzas/" + id);
});

// app.listen(app.get("port"), () => {
//   console.log(`${app.locals.title} is running on ${app.get("port")}.`);
// });
//
// app.get("/", (request, response) => {
//   response.sendFile(path.join(__dirname, "/static/index.html"));
// })
//
// app.use(express.static("static"));

if (!module.parent) {
  app.listen(app.get("port"), () => {
    console.log(`${app.locals.title} is running on ${app.get("port")}.`);
  });
}

app.set("view engine", "jade");

app.locals.pizzas = {};

module.exports = app;
