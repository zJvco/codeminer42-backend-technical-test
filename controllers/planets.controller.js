const Planet = require("../models/Planet");
const PlanetDAO = require("../models/PlanetDAO");

// Select all planets
const selectAllPlanets = (req, res) => {
    const planetDAO = new PlanetDAO();
    planetDAO.selectAll()
        .then(planets => res.json(planets))
        .catch(err => res.status(500).send(err));
}

// Create planet
const createPlanet = (req, res) => {
    const body = req.body;
    const name = body["name"];

    // Checking if name is empty
    if (!name) {
        res.status(400).send("Invalid arguments");
    }

    const planet = new Planet();
    planet.name = name;

    const planetDAO = new PlanetDAO();
    planetDAO.insert(planet)
        .then(() => res.send("Created sucefully"))
        .catch(err => res.status(400).send(err));
}

module.exports = {selectAllPlanets, createPlanet}