const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//TEAM IMAGE GET
router.get('/', (req, res) => {
    const sqlText = `SELECT * FROM "team" WHERE id = $1;`;
    pool.query(sqlText, [req.user.team_id])
    .then((result) => {
        console.log('Team GET from database:', result);
        res.send(result.rows);    
    })
    .catch((error) => {
        console.log(`Error making database query ${sqlText}`, error);
        res.sendStatus(500);
    })
});

//TEAM IMAGE PUT
router.put('/image', (req, res) => {
    const sqlText = `UPDATE "team"
    SET "logo_url" = $1
    WHERE "id" = $2;`;
    pool.query(sqlText, [req.body.newImage, req.user.team_id])
    .then(result => {
        res.sendStatus(200);
    })
    .catch(error => {
        res.sendStatus(500);
    })
})

module.exports = router;