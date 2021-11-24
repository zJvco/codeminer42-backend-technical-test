// Standard model to use api with all resources
const insertPilots = `
INSERT INTO
pilots (certification, name, age, location_id)
VALUES (1234567, "pilot 1", 20, 1),
       (8274209, "pilot 2", 45, 2),
       (0435643, "pilot 3", 31, 3),
       (3459346, "pilot 4", 60, 4)
`;

const insertShips = `
INSERT INTO
ships (fuel_capacity, fuel_level, weight_capacity, pilot_certification)
VALUES (200, 200, 200, 8274209),
       (300, 300, 45, 1234567),
       (100, 100, 100, 3459346),
       (400, 400, 60, 0435643)
`;

const insertContracts = `
INSERT INTO
contracts (description, resource_name, resource_weight, origin_planet_id, destination_id, value)
VALUES ("200 water to andravi", "water", 40, 4, 1, 500.0),
       ("500 mineral to calas", "mineral", 100, 2, 4, 2000.0),
       ("300 food to aqua", "food", 30, 1, 3, 1200.0),
       ("100 water to demeter", "water", 60, 3, 2, 800.0)
`;

const insertPlanets = `
INSERT INTO
planets (name)
VALUES ("andvari"),
       ("demeter"),
       ("aqua"),
       ("calas")
`;

module.exports = { insertPilots, insertShips, insertContracts, insertPlanets }