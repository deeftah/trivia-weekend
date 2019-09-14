const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//CURRENT CONTEST DETAILS GET
router.get('/', (req, res) => {
    console.log('this is the CURRENT CONTEST DETAILS req', req.user.id);
    const sqlText = `SELECT "contest".id, "contest".contest_name, "contest".start_date, "contest".start_time, "contest".contest_name, "contest".team_id FROM "contest"
                    JOIN "team" ON "contest".id = "team".current_contest
                    JOIN "user" ON "team".id = "user".team_id
                    WHERE "user".id = $1;`;
    pool.query(sqlText, [req.user.id])
        .then((result) => {
            console.log('CURRENT CONTEST DETAILS GET from database:', result);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500);
        })
});

//CURRENT CONTEST UPDATE
router.put('/', (req, res) => {
    console.log('this is the UPDATE CURRENT CONTEST req', req.body);
    const sqlText = `UPDATE "team"
                    SET "current_contest" = $1
                    WHERE "id" = $2;`;
    pool.query(sqlText, [req.body.currentContest, req.user.team_id])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch(error => {
            res.sendStatus(500);
        })
})

module.exports = router;