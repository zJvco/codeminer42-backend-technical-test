const { internalServerErrorHandler, badRequestErrorHandler, unauthorizedErrorHandler } = require("../utils/errorHandler");
const { getFuelCosts } = require("../utils/checkCosts");
const { validateNumber, validateString } = require("../utils/dataTypeValidator");

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
    const name = body["name"].toLowerCase();
    const age = body["age"];
    const locationId = body["locationId"];

    // Checking if value is empty
    if (!certification || !name || !age || !locationId) {
        return badRequestErrorHandler(res, "Invalid arguments");
    }
    else if (!validateNumber(certification, age, locationId)) {
        return badRequestErrorHandler(res, "Invalid arguments");
    }
    else if (!validateString(name)) {
        return badRequestErrorHandler(res, "Invalid arguments");
    }

    const pilot = new Pilot();
    pilot.certification = certification;
    pilot.name = name;
    pilot.age = age;
    pilot.locationId = locationId;

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
            return badRequestErrorHandler(res, "Pilot not found");
        }

        pilot.certification = selectedPilot.certification;
        pilot.name = selectedPilot.name;
        pilot.age = selectedPilot.age;
        pilot.credits = selectedPilot.credits;
        pilot.locationId = selectedPilot.location_id;        
    }
    catch (error) {
        return internalServerErrorHandler(res, error);
    }

    // Create origin planet object
    let planetOrigin = new Planet();
    planetOrigin.id = pilot.locationId;
    
    const planetOriginDAO = new PlanetDAO();

    try {
        const selectedPlanetOrigin = await planetOriginDAO.select(planetOrigin);
        planetOrigin.id = selectedPlanetOrigin.id;
        planetOrigin.name = selectedPlanetOrigin.name;
    }
    catch (error) {
        return internalServerErrorHandler(res, err);        
    }

    const body = req.body;
    const destination = body["destination"].toLowerCase();

    if (!destination) {
        return badRequestErrorHandler(res, "Invalid arguments");
    }

    // Create destination planet object
    let planetDestination = new Planet();
    planetDestination.name = destination;

    const planetDestinationDAO = new PlanetDAO();

    try {
        const selectedPlanet = await planetDestinationDAO.select(planetDestination);
        
        if (!selectedPlanet) {
            return badRequestErrorHandler(res, "Planet not exists");
        }

        planetDestination.id = selectedPlanet.id;
        planetDestination.name = selectedPlanet.name;
    }
    catch (error) {
        return internalServerErrorHandler(res, error);
    }

    // Get fuel cost to apply in pilot ship
    let fuelCost = getFuelCosts(planetOrigin.name, planetDestination.name);

    if (fuelCost == null) {
        return badRequestErrorHandler(res, `You can't travel from ${planetOrigin.name} to ${planetDestination.name}`);
    }

    // Create ship object
    let ship = new Ship();
    ship.pilotCertification = pilot.certification;

    const shipDAO = new ShipDAO();

    try {
        const selectedPilotShip = await shipDAO.selectByPilotCertification(ship);
        
        if (!selectedPilotShip || selectedPilotShip.pilot_certification != pilot.certification) {
            return badRequestErrorHandler(res, `The pilot ${pilot.name} don't have any ship registred`);
        }

        ship.id = selectedPilotShip.id;
        ship.fuelCapacity = selectedPilotShip.fuel_capacity;
        ship.fuelLevel = selectedPilotShip.fuel_level;
        ship.weightCapacity = selectedPilotShip.weight_capacity;
        ship.pilotCertification = selectedPilotShip.pilot_certification;
    }
    catch (error) {
        return internalServerErrorHandler(res, error);
    }

    if (ship.fuelLevel < fuelCost) {
        return unauthorizedErrorHandler(res, "You need to refill fuel of your ship");
    }

    // Change pilot location and ship fuel
    pilot.locationId = planetDestination.id;
    ship.fuelLevel -= fuelCost;

    try {
        pilotDAO.update(pilot);
        shipDAO.update(ship);
    }
    catch (error) {
        return internalServerErrorHandler(res, error);
    }
    finally {
        return res.status(200).send(`Journey completed, you are in ${planetDestination.name} now`);
    }
}

module.exports = { selectAllPilots, selectPilotById, createPilot, journey }