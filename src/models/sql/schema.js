// Database Structure Tables
const pilotTable = `
CREATE TABLE IF NOT EXISTS pilots (
    certification INTEGER NOT NULL,
    name TEXT NOT NULL,
    age INTEGER NOT NULL,
    credits FLOAT,
    location_id INTEGER NOT NULL,

    PRIMARY KEY (certification),
    FOREIGN KEY (location_id) REFERENCES planets(id)
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
    resource_name TEXT NOT NULL,
    resource_weight INTEGER NOT NULL,
    origin_planet_id INTEGER NOT NULL,
    destination_id INTEGER NOT NULL,
    value FLOAT NOT NULL,
    status TEXT DEFAULT "open" NOT NULL,
    pilot_certification INTEGER,

    PRIMARY KEY (id),
    FOREIGN KEY (origin_planet_id) REFERENCES planets(id),
    FOREIGN KEY (destination_id) REFERENCES planets(id),
    FOREIGN KEY (pilot_certification) REFERENCES pilots(certification)
)
`;

const planetTable = `
CREATE TABLE IF NOT EXISTS planets (
    id INTEGER NOT NULL,
    name TEXT UNIQUE NOT NULL,

    PRIMARY KEY (id)
)
`;

module.exports = { pilotTable, shipTable, contractTable, planetTable }