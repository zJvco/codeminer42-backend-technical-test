const { internalServerErrorHandler, badRequestErrorHandler } = require("../utils/errorHandler");
const { validateNumber, validateString } = require("../utils/dataTypeValidator");

const PlanetDAO = require("../models/PlanetDAO");
const PilotDAO = require("../models/PilotDAO");
const Contract = require("../models/Contract");
const ContractDAO = require("../models/ContractDAO");

const ConnectionFactory = require("../models/ConnectionFactory");

const selectTransportedResourcesPlanet = async (req, res) => {
    const conn = new ConnectionFactory().connection;

    const planetDAO = new PlanetDAO();

    var reportList = new Object();

    try {
        const selectedAllPlanets = await planetDAO.selectAll();

        if (!selectedAllPlanets) {
            badRequestErrorHandler(res, "Not exists planets in database");
        }

        // Get sent resources by planet
        const querySent = `
        SELECT c.resource_name, SUM(c.resource_weight) AS weight_sum
        FROM planets p
        JOIN contracts c ON p.id = c.origin_planet_id
        WHERE p.id = ? AND c.status = "closed"
        GROUP BY c.resource_name
        `;

        // Get received resources by planet
        const queryReceived = `
        SELECT c.resource_name, SUM(c.resource_weight) AS weight_sum
        FROM planets p
        JOIN contracts c ON p.id = c.destination_id
        WHERE p.id = ? AND c.status = "closed"
        GROUP BY c.resource_name
        `;


        for (let i = 0; i < selectedAllPlanets.length; i++) {
            const sentPromise = () => {
                return new Promise((resolve, reject) => {
                    conn.all(querySent, selectedAllPlanets[i].id, (err, row) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(row);
                        }
                    });
                })
            }

            const receivePromise = () => {
                return new Promise((resolve, reject) => {
                    conn.all(queryReceived, selectedAllPlanets[i].id, (err, row) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(row);
                        }
                    });
                })
            }

            const sent = await sentPromise();
            const receive = await receivePromise();

            reportList[selectedAllPlanets[i].name] = {"sent": {}, "receive": {}}

            for (let j = 0; j < sent.length; j++) {
                reportList[selectedAllPlanets[i].name]["sent"][sent[j].resource_name] = sent[j].weight_sum;
            }

            for (let j = 0; j < receive.length; j++) {
                reportList[selectedAllPlanets[i].name]["receive"][receive[j].resource_name] = receive[j].weight_sum;
            }
        }
    }
    catch (error) {
        return internalServerErrorHandler(res, error);
    }
    finally {
        return res.status(200).json(reportList);
    }
}

const selectTransportedResourcesPilot = async (req, res) => {
    const conn = new ConnectionFactory().connection;

    const pilotDAO = new PilotDAO();

    var reportList = new Object();

    try {
        const selectedAllPilots = await pilotDAO.selectAll();

        if (!selectedAllPilots) {
            badRequestErrorHandler(res, "Not exists pilots in database");
        }

        const query = `
        SELECT c.resource_name, ((COUNT(c.resource_name) * 100) / 100) AS percentage
        FROM pilots p
        JOIN contracts c ON p.certification = c.pilot_certification
        WHERE p.certification = ?
        GROUP BY p.certification
        `;

        for (let i = 0; i < selectedAllPilots.length; i++) {
            const promise = () => {
                return new Promise((resolve, reject) => {
                    conn.all(query, selectedAllPilots[i].certification, (err, row) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(row);
                        }
                    });
                })
            }

            const pilots = await promise();

            reportList[selectedAllPilots[i].name] = {};
            for (let j = 0; j < pilots.length; j++) {
                reportList[selectedAllPilots[i].name][pilots[j].resource_name] = pilots[j].percentage;
            }
        }

    }
    catch (error) {
        return internalServerErrorHandler(res, error);
    }
    finally {
        return res.status(200).json(reportList);
    }
}

const selectTransactions = async (req, res) => {
    const conn = new ConnectionFactory().connection;

    const contractDAO = new ContractDAO();

    var reportList = new Array();

    try {
        const selectedAllContracts = await contractDAO.selectAll();

        if (!selectedAllContracts) {
            badRequestErrorHandler(res, "Not exists contracts in database");
        }

        const query = `
        SELECT c.description, c.value
        FROM contracts c
        WHERE c.id = ? AND c.status = "closed"
        `;

        for (let i = 0; i < selectedAllContracts.length; i++) {
            const promise = () => {
                return new Promise((resolve, reject) => {
                    conn.all(query, selectedAllContracts[i].id, (err, row) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(row);
                        }
                    });
                })
            }

            const contracts = await promise();

            for (let j = 0; j < contracts.length; j++) {
                const temp = `${contracts[j].description} paid: -K${contracts[j].value}`;
                reportList.push(temp);
            }
        }

    }
    catch (error) {
        return internalServerErrorHandler(res, error);
    }
    finally {
        return res.status(200).json(reportList);
    }
}

module.exports = { selectTransportedResourcesPlanet, selectTransportedResourcesPilot, selectTransactions }