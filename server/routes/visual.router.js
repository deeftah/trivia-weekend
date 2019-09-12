const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//VISUAL DATA GET
router.get('/', (req, res) => {
    const sqlText = `SELECT * FROM "visual"
                WHERE "visual".contest_id = $1
                ORDER BY "visual".image_number ASC;`;
    pool.query(sqlText, [req.user.team_id])
        .then((result) => {
            console.log('Visual GET from database:', result);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500);
        })
});

//VISUAL DATA PUT (MATCH LEVEL AND COMMENT)
router.put('/', (req, res) => {
    console.log('the req.body for the visual data put is:', req.body);
    const sqlText = `UPDATE "visual"
    SET "match_level" = $1, "comment" = $2
    WHERE "image_number" = $3;`;
    pool.query(sqlText, [req.body.newMatchLevel, req.body.newVisualComment, req.body.newVisualId])
        .then(result => {
            res.sendStatus(200);
        })
        .catch(error => {
            res.sendStatus(500);
        })
})

module.exports = router;