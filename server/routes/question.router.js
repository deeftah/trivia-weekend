const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:contest', (req, res) => {
    console.log('the question req.body', req.params.contest)

    let newContestId = ''
    let newContestHour = ''

    //ARRAY FOR REQ.BODY
    let contestAsArray = []
    let ampersandIndex;

    for (let each of req.params.contest) {
        contestAsArray.push(each)
        if (each == '&') {
            ampersandIndex = contestAsArray.indexOf(each)
        }
    }

    //LOGIC FOR CONTEST ID
    let newContestIdArray = contestAsArray.slice(10, ampersandIndex)

    for (let each of newContestIdArray) {
        newContestId += each
    }

    newContestId = Number(newContestId)

    //LOGIC FOR CONTEST HOUR
    let hourNumOneIndex = contestAsArray.length - 2
    let hourNumTwoIndex = contestAsArray.length - 1
    let hourNumOne = contestAsArray[hourNumOneIndex]
    let hourNumTwo = contestAsArray[hourNumTwoIndex]

    if (hourNumOne == '=') {
        newContestHour = Number(hourNumTwo)
    } else {
        newContestHour = Number(hourNumOne + hourNumTwo)
    }

    const sqlText = `SELECT * FROM "questions"
                    WHERE "questions".contest_id = $1 AND "questions"."hour" = $2
                    ORDER BY "questions".question_number;`;
    pool.query(sqlText, [newContestId, newContestHour])
        .then((result) => {
            console.log('Question GET from database:', result);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('Error performing Question GET', error);
            res.sendStatus(500);
        })
});

//ADDING NEW TRIVIA QUESTION
router.post('/', (req, res) => {
    console.log('the question req.body', req.body);
    req.body.pointValue = Number(req.body.pointValue)
    const sqlText = `INSERT INTO "questions" ("point_value", "question_description", "correct", "answer", "contest_id", "hour", "question_number") VALUES ($1, $2, $3, $4, $5, $6, $7);`;
    pool.query(sqlText, [req.body.pointValue, req.body.questionDescription, req.body.correct, req.body.answer, req.body.contestId, req.body.questionHour, req.body.questionNumber])
        .then(result => {
            console.log('the response here is', result)
            res.sendStatus(201)
        })
        .catch(error => {
            res.sendStatus(500)
        })
})

//UPDATING EXISTING TRIVIA QUESTION
router.put('/', (req, res) => {
    console.log('the question req.body PUT', req.body);
    req.body.pointValue = Number(req.body.pointValue)
    const sqlText = `UPDATE "questions"
                    SET "point_value" = $1, "question_description" = $2, "correct" = $3, "answer" = $4
                    WHERE "questions".id = $5;`;
    pool.query(sqlText, [req.body.pointValue, req.body.questionDescription, req.body.correct, req.body.answer, req.body.questionId])
        .then(result => {
            console.log('the response here is', result)
            res.sendStatus(200)
        })
        .catch(error => {
            res.sendStatus(500)
        })
})

//GET POINT TOTAL
router.get('/total/:id', (req, res) => {
    console.log('the req.params is for the point total', req.params.id);
    const sqlText = `SELECT SUM(point_value)
                    FROM "questions"
                    WHERE "contest_id" = $1 AND correct = 'true';`;
    pool.query(sqlText, [req.params.id])
        .then(result => {
            console.log('the response here is', result.rows)
            res.send(result.rows);
        })
        .catch(error => {
            res.sendStatus(500)
        })
})

module.exports = router;