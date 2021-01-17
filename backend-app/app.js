const express = require('express')
const fs = require('fs')
const pg = require('pg')
const cors = require('cors')
const app = express()
const db = require('./database')

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
const port = 8080;

var groupsRouter = require('./routes/groups');
var matchesRouter = require('./routes/matches');
var moviesRouter = require('./routes/movies');
var usersRouter = require('./routes/users');

app.use('/groups', groupsRouter);
app.use("/matches", matchesRouter);
app.use("/movies", moviesRouter);
app.use('/users', usersRouter);

app.get('/', (req, res) => {
  db.query('SELECT NOW()', (err, response) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send("It is now "+response.rows[0]["now"]);
    }
  })
})

app.get('/test', (req, res) => {
  db.query('SELECT 1', (err, response) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send([{"title": "Boo"}, {"title": "Boo2"}]);
    }
  })
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})