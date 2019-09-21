const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');

//ALL CONTESTS DETAILS GET
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('this is the ALL CONTESTS DETAILS req.body', req.user.team_id);
    const sqlText = `SELECT * FROM "contest"
                    WHERE "contest".team_id = $1
                    ORDER BY "contest".id DESC;`;
    pool.query(sqlText, [req.user.team_id])
        .then((result) => {
            console.log('ALL CONTESTS DETAILS GET from database:', result);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500);
        })
});

//ADD NEW CONTEST
router.post('/', rejectUnauthenticated, (req, res) => {
    console.log('this is the ADD CONTEST req.body', req.body);
    const sqlText = `INSERT INTO "contest" ("contest_name", "start_date", "start_time", "number_of_hours", "number_of_questions", "team_id") 
                    VALUES ($1, $2, $3, $4, $5, $6);`;
    pool.query(sqlText, [req.body.contestName, req.body.startDate, req.body.startTime, req.body.numberOfHours, req.body.numberOfQuestions, req.user.team_id])
        .then((result) => {
            console.log('ADD CONTEST POST from database:', result);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error POSTing new contest: ${sqlText}`, error);
            res.sendStatus(500);
        })
})

module.exports = router;