const express = require("express");
const router = express.Router();
const pool = require("../database/connect");

router.post("/visits", async (req, res) => {
    const websiteId = req.body.id;

    await pool.connect();

    try {
        const websiteData = await pool.query(`
            SELECT visits.id_client AS clinet_id, clients.ip AS client_ip, visits.date, visits.time, visits.time_zone_offset, visits.languages, visits.primary_language, visits.platform
            FROM visits
            JOIN clients ON visits.id_client = clients.id
            WHERE id_website = '${websiteId}'
            ORDER BY visits.timestamp DESC
        `);

        res.send(websiteData);
    } catch (err) {
        console.log(err);
    }
});

router.post("/visit", async (req, res) => {
    const ip = req.body.ip;
    const hostname = req.body.hostname;
    const date = req.body.date;
    const time = req.body.time;
    const timeZoneOffset = req.body.timeZoneOffset;
    const languages = req.body.languages;
    const primaryLanguage = req.body.primaryLanguage;
    const platform = req.body.platform;

    await pool.connect();

    try {
        //  get website id
        const websiteId = await pool.query(`
            SELECT id
            FROM websites
            WHERE hostname = '${hostname}';
        `);

        if (websiteId.rows.length >= 1) {
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
                INSERT INTO visits (id_website, id_client, date, time, time_zone_offset, languages, primary_language, platform)
                VALUES (${websiteId.rows[0].id}, ${clientId.rows[0].id}, '${date}', '${time}', '${timeZoneOffset}', '${languages}', '${primaryLanguage}', '${platform}');
            `);

            res.send({ message: "VISIT SUCCESSFULLY REGISTERED :)" });
        } else {
            res.send({
                message: "WEBSITE IS NOT REGISTERED ON NICO ANALITYCS :(",
            });
        }
    } catch (err) {
        console.log(err);
        res.send({ message: "VISIT REGISTRATION FAILED :(" });
    }
});

module.exports = router;
