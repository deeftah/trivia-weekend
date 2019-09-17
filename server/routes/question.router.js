const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:contest', (req, res) => {
    console.log('the question req.body', req.params.contest)

    let contestAsArray=[]

    for (let each of req.params.contest) {
        contestAsArray.push(each)
    }

    let contestId = [contestAsArray[10]];
    let currentHour = [];
    let sqlContestId;
    let sqlCurrentHour;

    if (contestAsArray[11] >= 0 && contestAsArray[11] <= 9) {
        contestId.push(contestAsArray[11])
    }
    if (contestAsArray[24] >= 0 && contestAsArray[24] <= 9) {
        currentHour.push(contestAsArray[24])
    }
    if (contestAsArray[25] >= 0 && contestAsArray[25] <= 9) {
        currentHour.push(contestAsArray[25])
    }
    if (contestAsArray[26] >= 0 && contestAsArray[26] <= 9) {
        currentHour.push(contestAsArray[26])
    }

    console.log('THE CONTEST AS ARRAY', currentHour)

    if (contestId.length === 2) {
        let numOne = contestId[0]
        let numTwo = contestId[1]
        let numAsStringOne = numOne.toString()
        let numAsStringTwo = numTwo.toString()
        sqlContestId = numAsStringOne + numAsStringTwo
        sqlContestId = Number(sqlContestId)
    } else if (contestId.length === 1) {
        sqlContestId = Number(contestId[0])
    }

    if (currentHour.length === 2) {
        let numOne = currentHour[0]
        let numTwo = currentHour[1]
        let numAsStringOne = numOne.toString()
        let numAsStringTwo = numTwo.toString()
        sqlCurrentHour = numAsStringOne + numAsStringTwo
        sqlCurrentHour = Number(sqlCurrentHour)
    } else {
        sqlCurrentHour = Number(currentHour[0])
    }

    console.log('the sqlCurrentHour', sqlCurrentHour)
    console.log('the initial current hour is', currentHour)
    console.log('the sqlContestId', sqlContestId)
    
    const sqlText = `SELECT * FROM "questions"
                    WHERE "questions".contest_id = $1 AND "questions"."hour" = $2
                    ORDER BY "questions".question_number;`;
    pool.query(sqlText, [sqlContestId, sqlCurrentHour])
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