var express = require('express');
var router = express.Router();

const db = require('../database');

router.get('/', (req, res) => {
  db.query('SELECT * FROM movies LIMIT 10', (err, response) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({movies: response.rows});
    }
  });
});




module.exports = router;
