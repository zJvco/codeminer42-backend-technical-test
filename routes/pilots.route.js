const express = require("express");
const router = express.Router();

const Pilot = require("../models/Pilot");

router.route("/")
    .get((req, res) => {
        res.send("Hello World");
    })
    .post((req, res) => {
        const body = req.body;
        const certification = req.body["certification"];
        const name = body["name"];
        const age = body["age"];
        const location = body["location"];

        if (!name && !age && !location)

        const pilot = new Pilot();
        pilot.certification = certification;
        pilot.name = name;
        pilot.age = age;
        pilot.credits = credits;
        pilot.location = location;

        console.log(pilot);
    })

router.route("/:certification")
    .get((req, res) => {
        //
    })
    .put((req, res) => {
        //
    })
    .delete((req, res) => {
        //
    })

module.exports = router