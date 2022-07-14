const express = require("express");
const router = express.Router();
const pool = require("../database/connect");

router.get("/websites", async (req, res) => {
    await pool.connect();
    pool.query("SELECT * FROM websites", (err, result) => {
        if (err) throw err;
        res.send({ msg: result.rows });
    });
});

router.post("/websites", async (req, res) => {
    const websiteUrl = req.body.hostname;
    const websiteId = req.body.id;
    await pool.connect();
    pool.query(
        `INSERT INTO websites (hostname, id) VALUES ('${websiteUrl}', ${websiteId})`,
        (err, result) => {
            if (err) throw err;
            res.send({ message: `${websiteUrl} SUCCESSFULLY ADDED!` });
        }
    );
});

router.delete("/websites", async (req, res) => {
    const id = req.body.id;
    await pool.connect();
    pool.query(`DELETE FROM websites WHERE id=${id}`, (err, result) => {
        if (err) throw err;
        res.send({ message: "WEBSITE SUCCESSFULLY DELETED!" });
    });
});

module.exports = router;
