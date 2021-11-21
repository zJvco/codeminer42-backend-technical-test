const express = require("express");
const router = express.Router();

const ConnectionFactory = require("../models/ConnectionFactory");

const Pilot = require("../models/Pilot");
const PilotDAO = require("../models/PilotDAO");

router.route("/")
    .get((req, res) => {
        const conn = new ConnectionFactory().connection;
        conn.all("SELECT * FROM pilots", (err, row) => {
            if (err) {
                res.status(500).send("Error to select from table pilots");
            }
            else {
                res.send(row);
            }
        });
    })
    .post((req, res) => {
        const body = req.body;
        const certification = body["certification"];
        const name = body["name"];
        const age = body["age"];
        const location = body["location"];

        // Checking if value is empty
        if (!certification || !name || !age || !location) {
            res.status(400).send("Invalid arguments");
        }

        // Pilot class to store information
        const pilot = new Pilot();
        pilot.certification = certification;
        pilot.name = name;
        pilot.age = age;
        pilot.location = location;

        // Data acess object to persist data in db
        const pilotDAO = new PilotDAO();
        pilotDAO.insert(pilot, res);
    })

router.route("/:certification")
    .get((req, res) => {
        const certification = req.params.certification;

        // Pilot class to store information
        const pilot = new Pilot();
        pilot.certification = certification;

        // Data acess object to select data in db
        const pilotDAO = new PilotDAO();
        pilotDAO.select(pilot, res);
    })

module.exports = router