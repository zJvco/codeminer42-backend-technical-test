const { internalServerErrorHandler, badRequestErrorHandler } = require("../utils/errorHandler");

const Ship = require("../models/Ship");
const ShipDAO = require("../models/ShipDAO");
const Pilot = require("../models/Pilot");
const PilotDAO = require("../models/PilotDAO");

// Select all ships
const selectAllShips = (req, res) => {
    const shipDAO = new ShipDAO();
    shipDAO.selectAll()
        .then(ships => res.json(ships))
        .catch(err => internalServerErrorHandler(res, err));
}

// Select ship by id
const selectShip = (req, res) => {
    const id = req.params.id;

    const ship = new Ship();
    ship.id = id;

    const shipDAO = new ShipDAO();
    shipDAO.selectById(ship)
        .then(ship => res.json(ship))
        .catch(err => internalServerErrorHandler(res, err));
}

// Create a ship
const createShip = (req, res) => {
    const body = req.body;
    const fuelCapacity = body["fuelCapacity"].toLowerCase();
    const fuelLevel = fuelCapacity;
    const weightCapacity = body["weightCapacity"].toLowerCase();
    const pilotCertification = body["pilotCertification"].toLowerCase();

    // Checking if the values is empty
    if (!fuelCapacity || !fuelLevel || !weightCapacity || !pilotCertification) {
        return badRequestErrorHandler(res, "Invalid Arguments");
    }

    const pilot = new Pilot();
    pilot.certification = pilotCertification;

    // Checking if pilot exists
    const pilotDAO = new PilotDAO();
    pilotDAO.select(pilot)
        .then(pilot => {
            if (!pilot) {
                return badRequestErrorHandler(res, "Pilot certification is wrong, check if this pilot really exists")
            }
        })
        .catch(err => internalServerErrorHandler(res, err));

    const ship = new Ship();
    ship.fuelCapacity = fuelCapacity;
    ship.fuelLevel = fuelLevel;
    ship.weightCapacity = weightCapacity;
    ship.pilotCertification = pilotCertification;

    const shipDAO = new ShipDAO();
    shipDAO.insert(ship)
        .then(() => res.send("Created successfully"))
        .catch(err => internalServerErrorHandler(res, err));
}

// Function to refill fuel of the ship
const refillFuel = async (req, res) => {
    // Ship id
    const id = req.params.id;

    // Create ship object
    const ship = new Ship();
    ship.id = id;

    const shipDAO = new ShipDAO();
    try {
        const selectedShip = await shipDAO.selectById(ship);

        if (!selectedShip) {
            return badRequestErrorHandler(res, "Ship doesn't exists");
        }

        ship.id = selectedShip.id;
        ship.fuelCapacity = selectedShip.fuel_capacity;
        ship.fuelLevel = selectedShip.fuel_level;
        ship.weightCapacity = selectedShip.weight_capacity;
        ship.pilotCertification = selectedShip.pilot_certification;
    }
    catch (error) {
        return internalServerErrorHandler(req, error);
    }

    // Receive fuel quantity from body post
    const body = req.body;
    const fuelQuantity = body["fuelQuantity"];

    if (!fuelQuantity) {
        return badRequestErrorHandler(res, "Invalid arguments");
    }
    else if ((fuelQuantity + ship.fuelLevel) > ship.fuelCapacity) {
        return badRequestErrorHandler(res, `The maximun fuel capacity is ${ship.fuelCapacity}`);
    }

    // Total price of fuel by quantity
    let totalPrice = fuelQuantity * 7;

    // Create pilot object
    const pilot = new Pilot();
    pilot.certification = ship.pilotCertification;

    const pilotDAO = new PilotDAO();
    
    try {
        const selectedPilot = await pilotDAO.select(pilot);

        if (!selectedPilot) {
            return badRequestErrorHandler(res, "Pilot doesn't exists");
        }

        pilot.certification = selectedPilot.certification;
        pilot.name = selectedPilot.name;
        pilot.age = selectedPilot.age;
        pilot.locationId = selectedPilot.location_id;
    }
    catch (error) {
        return internalServerErrorHandler(res, error);
    }

    if (pilot.credits == null || pilot.credits < totalPrice) {
        return badRequestErrorHandler(res, "Pilot doesn't has credits to refill fuel of the ship");
    }
    else {
        // Update ship fuel level and credits in database
        ship.fuelLevel += fuelQuantity;
        pilot.credits -= totalPrice;

        try {
            pilotDAO.update(pilot);
            shipDAO.update(ship);
        }
        catch (error) {
            return internalServerErrorHandler(res, error);            
        }
        finally {
            return res.status(200).send("Fuel refill completed");
        }
    }
}

module.exports = { selectAllShips, selectShip, createShip, refillFuel }