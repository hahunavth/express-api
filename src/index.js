// var http = require("http");
const Sequelize = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite"
});
var express = require("express");
var app = express();
const port = 3000;

//create a server object:
// http
//   .createServer(function(req, res) {
//     res.write("Hello World!"); //write a response to the client
//     res.end(); //end the response
//   })
//   .listen(8080); //the server object listens on port 8080
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const Note = sequelize.define("notes", {
  note: Sequelize.TEXT,
  tag: Sequelize.STRING
});

sequelize.sync({ force: true }).then(() => {
  console.log(`Database & tables created!`);

  Note.bulkCreate([
    { note: "pick up some bread after work", tag: "shopping" },
    { note: "remember to write up meeting notes", tag: "work" },
    { note: "learn how to use node orm", tag: "work" }
  ])
    .then(function () {
      return Note.findAll();
    })
    .then(function (notes) {
      // console.log(notes);
    });
});

// GET method route
app.get("/", function (req, res) {
  res.send("GET /");
});

app.route("/notes").get(function (req, res) {
  Note.findAll().then((notes) => {
    res.json(notes);
  });
});

app.get("/notes/:id", function (req, res) {
  Note.findAll({ where: { id: req.params.id } }).then((notes) =>
    res.json(notes)
  );
});

app
  .route("/book")
  .get(function (req, res) {
    res.send("Get a random book");
  })
  .post(function (req, res) {
    res.send("Add a book");
  })
  .put(function (req, res) {
    res.send("Update the book");
  });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// app.use(express.static("public"));
app.use("/static", express.static("public"));
