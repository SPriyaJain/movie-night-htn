var express = require('express');
var router = express.Router();

const db = require('../database');

// Grab matches from a specific group (only already made matches).
// Input: groupId
router.get('/group/:groupId', (req, res) => {
    db.query('SELECT * FROM matches, movies WHERE matches.group_id=$1 and matches.mid=movies.mid;', [req.params.groupId], (err, matches) => {
        res.json({matches: matches.rows});
    });
});

// Grab matches from a specific user (only already made matches).
// Input: userId
router.get('/user/view/:userId', (req, res) => {
    db.query('SELECT * FROM matches, movies WHERE (matches.u1=$1 OR matches.u2=$1) and matches.mid=movies.mid;', [req.params.userId], (err, matches) => {
        res.json({matches: matches.rows});
    });
});

// Grab matches from a specific user (only already made matches).
// Input: userId
router.get('/user/viewnew/:userId', (req, res) => {
    db.query('SELECT * FROM matches, movies WHERE (matches.u1=$1 OR matches.u2=$1) and matches.mid=movies.mid and accepted=false and deleted=false;', [req.params.userId], (err, matches) => {
        res.json({matches: matches.rows});
    });
});

// Endpoint to find new matches after liking
// Input: userId
// Output: new matches
// Extra: Inserts new matches to matches table
router.get('/user/:userId', (req, res) => {
    db.query('SELECT group_id FROM group_members where uid=$1;', [req.params.userId], async (err, groups) => {
        let finalMatches = [];
        for (const group of groups.rows) {
            await db.query('SELECT uid from group_members WHERE group_id=$1 AND uid<>$2;', [group.group_id, req.params.userId]).then(async (members) => {
                if (members.rows.length === 0) {
                    return;
                }
                membersArr = members.rows.map((member) => member.uid);
                paramsArr = membersArr.map((_, idx) => "$"+(idx+3));
                await db.query('SELECT movies.mid, movies.name AS title, users.uid, users.name FROM movies, user_liked_movies AS ulm1, user_liked_movies AS ulm2, users WHERE movies.mid=ulm1.mid AND ulm1.mid=ulm2.mid AND users.uid=ulm1.uid AND ulm1.uid<>$1 AND ulm2.uid=$1 and ulm1.uid IN (' + paramsArr.join(',') + ') AND NOT EXISTS (SELECT * FROM matches WHERE group_id=$2 AND matches.mid=movies.mid AND ((matches.u1=$1 AND matches.u2=ulm1.uid) OR (matches.u1=ulm1.uid AND matches.u2=$1)));', [req.params.userId, group.group_id, ...membersArr]).then((matches) => {
                    if (matches.rows.length === 0) {
                        return;
                    }
                    for (let match of matches.rows) {
                        match.group_id = group.group_id;
                        finalMatches.push(match);
                    }
                });
            });
        }
        
        for (let i = 0; i < finalMatches.length; i++) {
            await db.query('INSERT INTO matches (mid, group_id, u1, u2, accepted, deleted) VALUES ($1, $2, $3, $4, false, false) RETURNING *;', [finalMatches[i].mid, finalMatches[i].group_id, req.params.userId, finalMatches[i].uid]).then(result => {
                finalMatches[i].match_id = result.rows[0].match_id;
            });
        }
        res.json({matches: finalMatches});
    });
});


module.exports = router;
