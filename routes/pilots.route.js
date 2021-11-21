const express = require("express");
const router = express.Router();

const Pilot = require("../models/Pilot");

router.route("/")
    .get((req, res) => {
        res.send("Hello World");
    })

router.route("/:certification")
    .get((req, res) => {
        //
    })
    .post((req, res) => {
        const body = req.body;
        const certification = req.params.certification;
        const name = body["name"];
        const age = body["age"];
        const credits = body["credits"];
        const location = body["location"];

        const pilot = new Pilot();
        pilot.certification = certification;
        pilot.name = name;
        pilot.age = age;
        pilot.credits = credits;
        pilot.location = location;

        console.log(pilot);
    })
    .put((req, res) => {
        //
    })
    .delete((req, res) => {
        //
    })

module.exports = router