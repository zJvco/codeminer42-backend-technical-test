const { internalServerErrorHandler, badRequestErrorHandler } = require("../utils/errorHandler");

const Planet = require("../models/Planet");
const PlanetDAO = require("../models/PlanetDAO");

// Select all planets
const selectAllPlanets = (req, res) => {
    const planetDAO = new PlanetDAO();
    planetDAO.selectAll()
        .then(planets => res.json(planets))
        .catch(err => internalServerErrorHandler(res, err));
}

// Create planet
const createPlanet = (req, res) => {
    const body = req.body;
    const name = body["name"];

    // Checking if name is empty
    if (!name) {
        badRequestErrorHandler(res, "Invalid arguments");
    }

    const planet = new Planet();
    planet.name = name;

    const planetDAO = new PlanetDAO();
    planetDAO.insert(planet)
        .then(() => res.send("Created sucefully"))
        .catch(err => internalServerErrorHandler(res, err));
}

module.exports = { selectAllPlanets, createPlanet }