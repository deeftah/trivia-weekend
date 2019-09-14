const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//ALL CONTESTS DETAILS GET
router.get('/', (req, res) => {
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

module.exports = router;