const { internalServerErrorHandler, badRequestErrorHandler } = require("../utils/errorHandler");

const Ship = require("../models/Ship");
const ShipDAO = require("../models/ShipDAO");

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
    const fuelCapacity = body["fuelCapacity"];
    const fuelLevel = 100;
    const weightCapacity = body["weightCapacity"];
    const pilotCertification = body["pilotCertification"];

    // Checking if the values is empty
    if (!fuelCapacity || !fuelLevel || !weightCapacity || !pilotCertification) {
        return badRequestErrorHandler(res, "Invalid Arguments");
    }

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

module.exports = { selectAllShips, selectShip, createShip }