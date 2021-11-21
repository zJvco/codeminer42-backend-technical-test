const ConnectionFactory = require("./ConnectionFactory");
const conn = new ConnectionFactory();

// Database Structure

const pilotTable = `
CREATE TABLE IF NOT EXISTS pilots (
    certification INTEGER NOT NULL,
    name TEXT NOT NULL,
    age INTEGER NOT NULL,
    credits FLOAT,
    location_planet TEXT NOT NULL,

    PRIMARY KEY (certification)
)
`;

const shipTable = `
CREATE TABLE IF NOT EXISTS ships (
    id INTEGER NOT NULL,
    fuel_capacity INTEGER NOT NULL,
    fuel_level INTEGER NOT NULL,
    weight_capacity INTEGER NOT NULL,

    PRIMARY KEY (id)
)
`;

const contractTable = `
CREATE TABLE IF NOT EXISTS contracts (
    id INTEGER NOT NULL,
    description TEXT NOT NULL,
    payload TEXT NOT NULL,
    origin_planet TEXT NOT NULL,
    destination TEXT NOT NULL,
    value FLOAT NOT NULL,

    PRIMARY KEY (id)
)
`;

const resourceTable = `
CREATE TABLE IF NOT EXISTS resources (
    id INTEGER NOT NULL,
    name TEXT NOT NULL,
    weigth INTEGER NOT NULL

    PRIMARY KEY (id)
)
`;