const { internalServerErrorHandler, badRequestErrorHandler } = require("../utils/errorHandler");

const Pilot = require("../models/Pilot");
const PilotDAO = require("../models/PilotDAO");

// Select all pilots
const selectAllPilots = (req, res) => {
    const pilotDAO = new PilotDAO();
    pilotDAO.selectAll()
        .then(pilots => res.json(pilots))
        .catch(err => internalServerErrorHandler(res, err));
}

// Select pilot by id
const selectPilotById = (req, res) => {
    const id = req.params.id;

    const pilot = new Pilot();
    pilot.certification = id;

    const pilotDAO = new PilotDAO();
    pilotDAO.select(pilot)
        .then(pilot => res.json(pilot))
        .catch(err => internalServerErrorHandler(res, err));
}

// Create pilot
const createPilot = (req, res) => {
    const body = req.body;
    const certification = body["certification"];
    const name = body["name"];
    const age = body["age"];
    const location = body["location"];

    // Checking if value is empty
    if (!certification || !name || !age || !location) {
        badRequestErrorHandler(res, "Invalid arguments");
    }

    const pilot = new Pilot();
    pilot.certification = certification;
    pilot.name = name;
    pilot.age = age;
    pilot.location = location;

    const pilotDAO = new PilotDAO();
    pilotDAO.insert(pilot)
        .then(() => res.send("Created successfully"))
        .catch(err => internalServerErrorHandler(res, err));
}

module.exports = { selectAllPilots, selectPilotById, createPilot }