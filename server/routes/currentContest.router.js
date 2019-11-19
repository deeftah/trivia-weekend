const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

//CURRENT CONTEST DETAILS GET
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('this is the CURRENT CONTEST DETAILS req', req.user.id);
    const sqlText = `SELECT "contest".id, "contest".contest_name, "contest".start_date, "contest".start_time, "contest".number_of_hours, "contest".number_of_questions, "contest".team_id FROM "contest"
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
router.put('/', rejectUnauthenticated, (req, res) => {
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

//CURRENT CONTEST DETAILS UPDATE
router.put('/details', rejectUnauthenticated, (req, res) => {
    console.log('this is the UPDATE CURRENT CONTEST DETAILS req', req.body);
    let startTimeNumber = Number(req.body.newStartTime);
    let numberOfHoursNumber = Number(req.body.newNumberOfHours);
    let numberOfQuestionsNumber = Number(req.body.newNumberOfQuestions);
    const sqlText = `UPDATE "contest"
                    SET "contest_name" = $1, "start_date" = $2, "start_time" = $3, "number_of_hours" = $4, "number_of_questions" = $5
                    WHERE "id" = $6;`;
    pool.query(sqlText, [req.body.newContestName, req.body.newStartDate, startTimeNumber, numberOfHoursNumber, numberOfQuestionsNumber, req.body.newContestId])
        .then((result) => {
            res.sendStatus(200)
        })
        .catch(error => {
            res.sendStatus(500);
        })
})

//ADD SPEED ROUND POST
router.post('/addSpeedRound', rejectUnauthenticated, (req, res) => {
    console.log('this is the ADD SPEED ROUND req.body', req.body);
    const sqlText = `INSERT INTO "hour" ("hour", "speed_round", "contest_id")
                    VALUES ($1, $2, $3);`;
    pool.query(sqlText, [req.body.contestHour, true, req.body.currentContest])
        .then((result) => {
            console.log('ADD SPEED ROUND from database:', result);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error POSTing new speed round: ${sqlText}`, error);
            res.sendStatus(500);
        })
})

//SPEED ROUND GET
router.get(`/fetchSpeedRound/:id`, rejectUnauthenticated, (req, res) => {
    console.log('this is the FETCH SPEED ROUND req', req.params.id);
    const sqlText = `SELECT "hour", "speed_round", "contest_id" FROM "hour"
                    JOIN "contest" ON "hour".contest_id = "contest".id
                    JOIN "team" ON "contest".id = "team".current_contest
                    JOIN "user" ON "team".id = "user".team_id
                    WHERE "user".id = $1 AND "hour"."hour" = $2;`;
    pool.query(sqlText, [req.user.id, req.params.id])
        .then((result) => {
            console.log('SPEED ROUND GET from database:', result);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500);
        })
});

module.exports = router;