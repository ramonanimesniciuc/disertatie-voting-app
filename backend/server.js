const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json({limit:'100mb'}));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
const db = require("./models");
const Role = db.role;

// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Db');
//   initial();
// })


function initial() {
  Role.create({
    id: 1,
    name: "user"
  });

  Role.create({
    id: 2,
    name: "moderator"
  });

  Role.create({
    id: 3,
    name: "admin"
  });

  Role.create({
    id:4,
    name:"sponsor"
  })
}
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to DSU.VOT" });
});

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/project.routes')(app);
require('./routes/categories.routes')(app);
require('./routes/backoffice.routes')(app);
require('./routes/news.routes')(app);
require('./routes/rewards.routes')(app);
require('./routes/sponsors.routes')(app);

// set port, listen for requests
const PORT = 3030;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
})
