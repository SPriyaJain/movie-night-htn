var express = require('express');
var router = express.Router();

const db = require('../database');

router.get('/all', (req, res) => {
  db.query(` \
    select distinct \
      movies.mid, \
      movies.name, \
      on_netflix,\
      on_prime,\
      on_disney,\
      on_hulu,\
      year,\
      rating,\
      overview,\
      imdb_id,\
      poster_path,\
      array_agg(genres.name || \'\') genres \
    from movies \
    inner join movie_genres using (mid)\
    inner join genres using (genre_id)\
    group by movies.mid\
    order by movies.mid`, 
  (err, response) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({movies: response.rows});
    }
  });
});

module.exports = router;
