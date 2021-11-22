const Pilot = require("../models/Pilot");
const PilotDAO = require("../models/PilotDAO");

// Select all pilots
const selectAllPilots = (req, res) => {
    const pilotDAO = new PilotDAO();
    pilotDAO.selectAll()
        .then(pilots => res.json(pilots))
        .catch(err => res.status(500).send(err));
}

// Select one pilot by id
const selectPilotById = (req, res) => {
    const id = req.params.id;

    // Pilot class to store information
    const pilot = new Pilot();
    pilot.certification = id;

    // Data acess object to select data in db
    const pilotDAO = new PilotDAO();
    pilotDAO.select(pilot)
        .then(pilot => res.json(pilot))
        .catch(err => res.status(500).send(err));
}

// Create pilot and 
const createPilot = (req, res) => {
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
    pilotDAO.insert(pilot)
        .then(() => res.send("Created sucefully"))
        .catch(err => res.status(500).send(err));
}

module.exports = {selectAllPilots, selectPilotById, createPilot}