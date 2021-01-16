var express = require('express');
var router = express.Router();

const db = require('../database');

router.get('/', (req, res) => {
  db.query('SELECT * from groups', (err, response) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({res: response.rows});
    }
  });
});

router.get('/create/:userId', (req, res) => {
  console.log(req.params.userId);
  db.query('INSERT INTO groups (group_id, pin) VALUES ($1, $2);', [2, "ABCD"], (req, response) => {
    console.log(response);
  });
});



module.exports = router;
