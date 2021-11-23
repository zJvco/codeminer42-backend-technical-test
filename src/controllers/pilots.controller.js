const { internalServerErrorHandler, badRequestErrorHandler } = require("../utils/errorHandler");
const { checkBlockedRoute } = require("../utils/checkRoutesCosts");

const Pilot = require("../models/Pilot");
const PilotDAO = require("../models/PilotDAO");
const Planet = require("../models/Planet");
const PlanetDAO = require("../models/PlanetDAO");

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

// Travel to other planets
const journey = async (req, res) => {
    const id = req.params.id;

    let pilot = new Pilot();
    pilot.certification = id;

    const pilotDAO = new PilotDAO();

    try {
        const selectedPilot = await pilotDAO.select(pilot);

        if (!selectedPilot) {
            badRequestErrorHandler(res, "Pilot not found");
        }

        pilot.certification = selectedPilot.certification;
        pilot.name = selectedPilot.name;
        pilot.age = selectedPilot.age;
        pilot.credits = selectedPilot.credits;
        pilot.location = selectedPilot.location;        
    }
    catch (error) {
        internalServerErrorHandler(res, error);
    }

    let planetOrigin = new Planet();
    planetOrigin.id = pilot.location;
    
    const planetOriginDAO = new PlanetDAO();

    try {
        const selectedPlanetOrigin = await planetOriginDAO.select(planetOrigin);
        planetOrigin.id = selectedPlanetOrigin.id;
        planetOrigin.name = selectedPlanetOrigin.name;
    }
    catch (error) {
        internalServerErrorHandler(res, err);        
    }

    const body = req.body;
    const destination = body["destination"];

    if (!destination) {
        badRequestErrorHandler(res, "Invalid arguments");
    }

    let planetDestination = new Planet();
    planetDestination.name = destination;

    const planetDestinationDAO = new PlanetDAO();

    try {
        const selectedPlanet = await planetDestinationDAO.select(planetDestination);
        
        if (!selectedPlanet) {
            badRequestErrorHandler(res, "Planet not exists");
        }

        planetDestination.id = selectedPlanet.id;
        planetDestination.name = selectedPlanet.name;
    }
    catch (error) {
        internalServerErrorHandler(res, error);
    }

    if (checkBlockedRoute(planetOrigin.name, planetDestination.name)) {
        badRequestErrorHandler(res, `You can't travel to ${planetOrigin.name} to ${planetDestination.name}`);
    }
}

module.exports = { selectAllPilots, selectPilotById, createPilot, journey }