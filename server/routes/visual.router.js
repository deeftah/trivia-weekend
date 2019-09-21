const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

//VISUAL DATA GET
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('this is the GET req.user.team_id', req.user.team_id);
    let teamId = req.user.team_id
    const sqlText = `SELECT "visual"."id", "url", "contest_id", "image_number", "match_level", "comment" FROM "visual"
                    JOIN "team" ON "visual".contest_id = "team".current_contest
                    WHERE "team".id = $1
                    ORDER BY "visual".image_number ASC;`;
    pool.query(sqlText, [teamId])
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
router.put('/', rejectUnauthenticated, (req, res) => {
    console.log('the req.body for the visual data put is:', req.body);
    const sqlText = `UPDATE "visual"
    SET "match_level" = $1, "comment" = $2
    WHERE "id" = $3;`;
    pool.query(sqlText, [req.body.newMatchLevel, req.body.newVisualComment, req.body.newVisualId])
        .then(result => {
            res.sendStatus(200);
        })
        .catch(error => {
            res.sendStatus(500);
        })
})

//VISUAL DATA POST (ADD IMAGE URL TO GALLERY)
router.post('/', rejectUnauthenticated, (req, res) => {
    console.log('the req.body for the visual POST is:', req.body);
    const sqlText = `INSERT INTO "visual" ("image_number", "url", "contest_id")
    VALUES ($1, $2, $3);`;
    pool.query(sqlText, [req.body.visualNumber, req.body.url, req.body.contestId])
        .then(result => {
            res.sendStatus(201);
        })
        .catch(error => {
            res.sendStatus(500);
        })
})

//VISUAL DELETE (REMOVE IMAGE FROM GALLERY)
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = `DELETE FROM "visual" WHERE id=$1;`;
    pool.query(sqlText, [req.params.id])
    .then(result => {
        res.sendStatus(200);
    })
    .catch(error => {
        res.sendStatus(500);
    })
})

module.exports = router;