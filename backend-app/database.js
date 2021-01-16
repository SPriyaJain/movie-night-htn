const fs = require('fs')
const pg = require('pg')

const config = {
    user: 'htnuser',
    host: 'free-tier.gcp-us-central1.cockroachlabs.cloud',
    database: 'sour-tapir-131.defaultdb',
    password: 'uwaterloo123',
    port: 26257,
    ssl: {
        ca: fs.readFileSync('./cc-ca.crt').toString()
    }
};

var db = new pg.Pool(config);
module.exports = db;
