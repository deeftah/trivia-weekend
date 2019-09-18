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

module.exports = router;