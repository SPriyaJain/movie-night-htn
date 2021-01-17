var express = require('express');
var router = express.Router();

const db = require('../database');
const crypo = require('crypto');

// Grab all users
router.get('/', (req, res) => {
  db.query('SELECT * FROM users', (err, response) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({users: response.rows});
    }
  });
});

// Like a new genre as a specific user
// Input userId & genreId
// Output success boolean
router.get('/:userId/genres/:genreId', (req, res) => {
    db.query('INSERT INTO user_liked_genres (uid, genre_id) VALUES ($1,$2);', [req.params.userId, req.params.genreId], (err, result) => {
        if (err) {
            res.json({success: false});    
        } else {
            res.json({success: true});
        }
    });
});

// Grab all liked genres by a specific user
// Input userId
router.get('/:userId/genres', (req, res) => {
    db.query('SELECT genres.genre_id, genres.name FROM genres, user_liked_genres WHERE user_liked_genres.genre_id=genres.genre_id AND user_liked_genres.uid=$1;', [req.params.userId], (err, genres) => {
        res.json({genres: genres.rows});
    });
});

// create new user
router.post('/create', (req, res) => {
  db.query('SELECT COUNT(*) FROM users;', async (err, response) => {
    let name = req.body.name;
    db.query('INSERT INTO users (name, joined_at) VALUES ($1, CURRENT_TIMESTAMP) RETURNING *;', [name], (err, response) => {
      res.json({user: response.rows[0]});
    });
  });
});



module.exports = router;
