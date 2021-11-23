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

// Select planet by id
const selectPlanet = (req, res) => {
    const id = req.params.id;

    const planet = new Planet();
    planet.id = id;

    const planetDAO = new PlanetDAO();
    planetDAO.select(planet)
        .then(planet => res.json(planet))
        .catch(err => internalServerErrorHandler(res, err));
}

// Create planet
const createPlanet = (req, res) => {
    const body = req.body;
    const name = body["name"].toLowerCase();

    // Checking if name is empty
    if (!name) {
        return badRequestErrorHandler(res, "Invalid arguments");
    }
    else if (name != "andvari" && name != "demeter" && name != "aqua" && name != "calas") {
        return badRequestErrorHandler(res, "You can insert only specify planets like andvari, demeter, aqua, calas");
    }

    const planet = new Planet();
    planet.name = name;

    const planetDAO = new PlanetDAO();
    planetDAO.insert(planet)
        .then(() => res.send("Created successfully"))
        .catch(err => internalServerErrorHandler(res, err));
}

module.exports = { selectAllPlanets, selectPlanet, createPlanet }