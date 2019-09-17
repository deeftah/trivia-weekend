const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:contestId', (req, res) => {
    console.log('the question req.body', req.params)
    const sqlText = `SELECT * FROM "questions"
                    WHERE "questions".contest_id = $1
                    ORDER BY "questions".question_number;`;
    pool.query(sqlText, [req.params.contestId])
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