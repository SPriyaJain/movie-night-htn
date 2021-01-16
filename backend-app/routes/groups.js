var express = require('express');
var router = express.Router();

const db = require('../database');

router.get('/', (req, res) => {
  db.query("SELECT * from groups;", (err, response) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({res: response.rows});
    }
  });
});

router.get('/:groupId', (req, res) => {
  db.query("SELECT * FROM group_members, users WHERE group_id=$1 and group_members.uid=users.uid;", [req.params.groupId], (err, response) => {
    res.json({members: response.rows});
  });
});

router.post('/create', (req, res) => {
  db.query('SELECT COUNT(*) FROM groups;', async (err, response) => {
    let pinStr = "BCAD" + response.rows[0].count;
    let newPin = pinStr.slice(pinStr.length-4);
    db.query('INSERT INTO groups (pin) VALUES ($1) RETURNING *;', [newPin], (err, response) => {
      res.json({group: response.rows[0]});
      db.query('INSERT INTO group_members (group_id, uid) VALUES ($1, $2);', [response.rows[0].group_id, req.body.uid]);
    });
  });
});

router.post('/join', (req, res) => {
  db.query("SELECT * FROM groups WHERE pin=$?;", [req.body.pin], (request, response) => {
    if (response.rows.length) {
      db.query("INSERT INTO group_members (group_id, uid) VALUES ($1,$2);", [response.rows[0].group_id, req.body.uid]);
      res.json({success: true, group: response.rows[0]});
    } else {
      res.json({success: false});
    }
  });
});



module.exports = router;
