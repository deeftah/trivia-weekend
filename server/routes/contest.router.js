const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//CONTEST DETAILS GET
router.get('/', (req, res) => {
    console.log('this is the CONTEST DETAILS req.body', req.user.id);
    const sqlText = `SELECT "contest".id, "contest".start_date, "contest".start_time, "contest".contest_name FROM "contest"
                    JOIN "team" ON "contest".id = "team".current_contest
                    JOIN "user" ON "team".id = "user".team_id
                    WHERE "user".id = $1;`;
    pool.query(sqlText, [req.user.id])
        .then((result) => {
            console.log('CONTEST DETAILS GET from database:', result);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500);
        })
});

module.exports = router;