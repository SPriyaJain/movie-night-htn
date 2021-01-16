const express = require('express')
const fs = require('fs')
const pg = require('pg')
const app = express()
const port = 3001

const config = {
  user: 'htnuser',
  host: 'free-tier.gcp-us-central1.cockroachlabs.cloud',
  database: 'sour-tapir-131.defaultdb',
  password: 'PASSWORDGOESHERE',
  port: 26257,
  ssl: {
    ca: fs.readFileSync('./cc-ca.crt')
        .toString()
  }
};

app.get('/', (req, res) => {
  const pool = new pg.Pool(config);
  
  pool.query('SELECT NOW()', (err, response) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send("It is now "+response.rows[0]["now"]);
    }
    pool.end()
  })
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})