const { internalServerErrorHandler, badRequestErrorHandler, unauthorizedErrorHandler } = require("../utils/errorHandler");
const { getFuelCosts } = require("../utils/checkCosts");
const { validateNumber, validateString } = require("../utils/dataTypeValidator");

const Pilot = require("../models/Pilot");
const PilotDAO = require("../models/PilotDAO");
const Planet = require("../models/Planet");
const PlanetDAO = require("../models/PlanetDAO");
const Ship = require("../models/Ship");
const ShipDAO = require("../models/ShipDAO");
const Contract = require("../models/Contract");
const ContractDAO = require("../models/ContractDAO");

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
    pilot.name = name.toLowerCase();
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
    const pilot = new Pilot();
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
    const planetOrigin = new Planet();
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
    const destination = body["destination"];

    if (!destination) {
        return badRequestErrorHandler(res, "Invalid arguments");
    }
    else if (!validateString(destination)) {
        return badRequestErrorHandler(res, "Invalid argument");
    }

    // Create destination planet object
    const planetDestination = new Planet();
    planetDestination.name = destination.toLowerCase();

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
    const ship = new Ship();
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

// Accept contract controller
const acceptContract = async(req, res) => {
    // Pilot id
    const id = req.params.id;

    // Create pilot object
    const pilot = new Pilot();
    pilot.certification = id;

    const pilotDAO = new PilotDAO();
    try {
        const selectedPilot = await pilotDAO.select(pilot);
        
        if (!selectedPilot) {
            return badRequestErrorHandler(res, "Pilot not exists");
        }

        pilot.certification = selectedPilot.certification;
        pilot.name = selectedPilot.name;
        pilot.age = selectedPilot.age;
        pilot.locationId = selectedPilot.location_id;
    }
    catch (error) {
        return internalServerErrorHandler(res, error);
    }

    // Create pilot ship object
    const ship = new Ship();
    ship.pilotCertification = pilot.certification;
    
    const shipDAO = new ShipDAO();
    
    try {
        const selectedPilotShip = await shipDAO.selectByPilotCertification(ship);
        
        if (!selectedPilotShip) {
            return badRequestErrorHandler(res, "Pilot doesn't has any ship registered in your name")
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

    // Receive contract id from body post
    const body = req.body;
    const contractId = body["contractId"];

    if (!contractId) {
        return badRequestErrorHandler(res, "Invalid arguments");
    }
    else if (!validateNumber(contractId)) {
        return badRequestErrorHandler(res, "Invalid arguments");
    }

    // Create contract object
    const contract = new Contract();
    contract.id = contractId;

    const contractDAO = new ContractDAO();

    try {
        const selectedContract = await contractDAO.select(contract);
        
        if (!selectedContract) {
            return badRequestErrorHandler(res, "Contract doesn't found");
        }

        contract.id = selectedContract.id;
        contract.description = selectedContract.description;
        contract.resourceName = selectedContract.resource_name;
        contract.resourceWeight = selectedContract.resource_weight;
        contract.originPlanetId = selectedContract.origin_planet_id;
        contract.destinationId = selectedContract.destination_id;
        contract.value = selectedContract.value;
        contract.status = selectedContract.status;
        contract.pilotCertification = selectedContract.pilot_certification;
    }
    catch (error) {
        internalServerErrorHandler(res, error);
    }

    // Checking if the contract is open or closed
    if (contract.status == "closed") {
        return badRequestErrorHandler(res, "This contract is closed");
    }
    else if (contract.pilotCertification) {
        return badRequestErrorHandler(res, "Already exist a pilot responsible for that contract");
    }
    else if (ship.weightCapacity < contract.resourceWeight) {
        return badRequestErrorHandler(res, "Ship doesn't has weight capacity to transport this cargo")
    }
    
    contract.pilotCertification = pilot.certification;
    
    try {
        contractDAO.update(contract);
    }
    catch (error) {
        return internalServerErrorHandler(res, error);
    }
    finally {
        return res.status(200).send(`Accepted contract ${contract.id}`);
    }
}

module.exports = { selectAllPilots, selectPilotById, createPilot, journey, acceptContract }