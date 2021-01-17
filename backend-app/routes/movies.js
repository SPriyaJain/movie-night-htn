var express = require('express');
var router = express.Router();

const db = require('../database');

// get movies
router.get('/', (req, res) => {
  db.query('SELECT * FROM movies LIMIT 10', (err, response) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({movies: response.rows});
    }
  });
});

// get movies by genres the user likes
router.get('/user/:userId', (req, res) => {
    db.query('SELECT genre_id FROM user_liked_genres WHERE uid=$1;', [req.params.userId], (err, genres) => {
        let genreArr = genres.rows.map((genre) => genre.genre_id);
        if (genreArr.length == 0) {
          genreArr = Array(27).fill().map((_, i) => i+1)
        }
        var params = [];
        for(var i = 2; i <= genreArr.length+1; i++) {
            params.push('$' + i);
        }
        
        db.query("SELECT DISTINCT mid FROM movie_genres WHERE mid NOT IN (SELECT mid FROM user_liked_movies WHERE uid=$1) AND genre_id in (" + params.join(',') + ") LIMIT 10;", [req.params.userId, ...genreArr], (err, movies) => {
            let movieArr = movies.rows.map((movie) => movie.mid);
            params = [];
            for(var i = 1; i <= movieArr.length; i++) {
                params.push('$' + i);
            }
            db.query("SELECT * FROM movies WHERE mid in (" + params.join(',') + ");", movieArr, async (err, movies) => {
              resp = movies.rows;
              // add genres to resp
              for (let movie in resp) {
                let mid = resp[movie]["mid"]
                let movieGenres = []

                movieGenres = await db.query("SELECT genre_id FROM movie_genres WHERE mid=$1", [mid]);
                movieGenres = movieGenres.rows.map((genre) => genre.genre_id);

                resp[movie]["genres"] = movieGenres;
              }

              res.json({movies: resp});
            })
        });
    })
  });
  

// like/dislikes movies (userId/movieId/is_like)
router.post('/like', (req, res) => {
    db.query('INSERT INTO user_liked_movies (uid, mid, is_liked) values ($1, $2, $3);',
        [req.body.uid, req.body.mid, Number(req.body.is_liked) !== 0], (err, result) => {
            if (err) {
                res.json({success: false});    
            } else {
                res.json({success: true});
            }
        });
});

module.exports = router;
