const express = require('express');
const router = express.Router();
const pool = require('../database/connect');

router.post('/visit', async(req, res) => {
    const ip = req.body.ip;
    const host = req.body.host;

    await pool.connect();

    try{
        //  get website id
        const websiteId = await pool.query(`
            SELECT id
            FROM websites
            WHERE hostname = '${host}';
        `);

        if(websiteId.rows.length >= 1) {
            //  add new client to db if unique
            await pool.query(`
                INSERT INTO clients (ip)
                VALUES ('${ip}')
                ON CONFLICT DO NOTHING;
            `);
            
            //  get client id
            const clientId = await pool.query(`
                SELECT id
                FROM clients
                WHERE ip = '${ip}';
            `);

            //  add new visit
            await pool.query(`
                INSERT INTO visits (id_website, id_client)
                VALUES (${websiteId.rows[0].id}, ${clientId.rows[0].id});
            `);

            res.send({ message: 'VISIT SUCCESSFULLY REGISTERED :)' });
        } else {
            res.send({ message: 'WEBSITE IS NOT REGISTERED ON NICO ANALITYCS :(' });
        };
    } catch(err) {
        console.log(err);
        res.send({ message: 'VISIT REGISTRATION FAILED :('})
    };

});

module.exports = router;