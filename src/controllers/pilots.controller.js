const { internalServerErrorHandler, badRequestErrorHandler, unauthorizedErrorHandler } = require("../utils/errorHandler");
const { getFuelCosts } = require("../utils/checkCosts");

const Pilot = require("../models/Pilot");
const PilotDAO = require("../models/PilotDAO");
const Planet = require("../models/Planet");
const PlanetDAO = require("../models/PlanetDAO");
const Ship = require("../models/Ship");
const ShipDAO = require("../models/ShipDAO");

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
    // receive pilot id
    const id = req.params.id;

    // Create pilot object
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

    // Create origin planet object
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
    const destination = body["destination"].toLowerCase();

    if (!destination) {
        badRequestErrorHandler(res, "Invalid arguments");
    }

    // Create destination planet object
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

    // Get fuel cost to apply in pilot ship
    let fuelCost = getFuelCosts(planetOrigin.name, planetDestination.name);

    if (fuelCost == null) {
        badRequestErrorHandler(res, `You can't travel from ${planetOrigin.name} to ${planetDestination.name}`);
    }

    // Create ship object
    let ship = new Ship();
    ship.pilotCertification = pilot.certification;

    const shipDAO = new ShipDAO();

    try {
        const selectedPilotShip = await shipDAO.selectByPilotCertification(ship);
        
        if (!selectedPilotShip || selectedPilotShip.pilot_certification != pilot.certification) {
            badRequestErrorHandler(res, `The pilot ${pilot.name} don't have any ship registred`);
        }

        ship.id = selectedPilotShip.id;
        ship.fuelCapacity = selectedPilotShip.fuel_capacity;
        ship.fuelLevel = selectedPilotShip.fuel_level;
        ship.weightCapacity = selectedPilotShip.weight_capacity;
        ship.pilotCertification = selectedPilotShip.pilot_certification;
    }
    catch (error) {
        internalServerErrorHandler(res, error);
    }

    if (ship.fuelLevel < fuelCost) {
        unauthorizedErrorHandler(res, "You need to refill fuel of your ship");
    }

    // Change pilot location and ship fuel
    pilot.location = planetDestination.id;
    ship.fuelLevel -= fuelCost;

    try {
        await pilotDAO.update(pilot);
        await shipDAO.update(ship);
    }
    catch (error) {
        internalServerErrorHandler(res, error);
    }
    finally {
        res.status(200).send(`Journey completed, you are in ${planetDestination.name} now`);
    }
}

module.exports = { selectAllPilots, selectPilotById, createPilot, journey }