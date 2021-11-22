// Database Structure Tables
const pilotTable = `
CREATE TABLE IF NOT EXISTS pilots (
    certification INTEGER NOT NULL,
    name TEXT NOT NULL,
    age INTEGER NOT NULL,
    credits FLOAT,
    location TEXT NOT NULL,

    PRIMARY KEY (certification)
)
`;

const shipTable = `
CREATE TABLE IF NOT EXISTS ships (
    id INTEGER NOT NULL,
    fuel_capacity INTEGER NOT NULL,
    fuel_level INTEGER NOT NULL,
    weight_capacity INTEGER NOT NULL,
    pilot_certification INTEGER UNIQUE NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (pilot_certification) REFERENCES pilots(certification)
)
`;

const contractTable = `
CREATE TABLE IF NOT EXISTS contracts (
    id INTEGER NOT NULL,
    description TEXT NOT NULL,
    origin_planet TEXT NOT NULL,
    destination TEXT NOT NULL,
    value FLOAT NOT NULL,
    pilot_certification INTEGER NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (origin_planet) REFERENCES planets(id),
    FOREIGN KEY (destination) REFERENCES planets(id),
    FOREIGN KEY (pilot_certification) REFERENCES pilots(certification)
)
`;

const contractResourceTable = `
CREATE TABLE IF NOT EXISTS contracts_resources (
    contract_id INTEGER NOT NULL,
    resource_id INTEGER NOT NULL,
    weigth INTEGER NOT NULL,

    FOREIGN KEY (contract_id) REFERENCES contracts(id),
    FOREIGN KEY (resource_id) REFERENCES resources(id)
)
`;

const resourceTable = `
CREATE TABLE IF NOT EXISTS resources (
    id INTEGER NOT NULL,
    name TEXT UNIQUE NOT NULL,

    PRIMARY KEY (id)
)
`;

const planetTable = `
CREATE TABLE IF NOT EXISTS planets (
    id INTEGER NOT NULL,
    name TEXT UNIQUE NOT NULL,

    PRIMARY KEY (id)
)
`;

module.exports = { pilotTable, shipTable, contractTable, contractResourceTable, resourceTable, planetTable }