var express = require('express');
var router = express.Router();

const db = require('../database');

router.get('/', (req, res) => {
  db.query('SELECT * FROM users', (err, response) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({users: response.rows});
    }
  });
});

router.get('/:userId/genres/:genreId', (req, res) => {
    db.query('INSERT INTO user_liked_genres (uid, genre_id) VALUES ($1,$2);', [req.params.userId, req.params.genreId], (err, result) => {
        if (err) {
            res.json({success: false});    
        } else {
            res.json({success: true});
        }
    });
});

router.get('/:userId/genres', (req, res) => {
    db.query('SELECT genres.genre_id, genres.name FROM genres, user_liked_genres WHERE user_liked_genres.genre_id=genres.genre_id AND user_liked_genres.uid=$1;', [req.params.userId], (err, genres) => {
        res.json({genres: genres.rows});
    });
});




module.exports = router;
