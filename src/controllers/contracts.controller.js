const { internalServerErrorHandler, badRequestErrorHandler } = require("../utils/errorHandler");

const Contract = require("../models/Contract");
const ContractDAO = require("../models/ContractDAO");

// Select all contract
const selectAllContracts = (req, res) => {
    const contractDAO = new ContractDAO();
    contractDAO.selectAll()
        .then(contracts => res.json(contracts))
        .catch(err => internalServerErrorHandler(res, err));
}

// Select contract by id
const selectContractById = (req, res) => {
    const id = req.params.id;

    const contract = new Contract();
    contract.id = id;

    const contractDAO = new ContractDAO();
    contractDAO.select(contract)
        .then(contract => res.json(contract))
        .catch(err => internalServerErrorHandler(res, err));
}

// Create contract
const createContract = (req, res) => {
    const body = req.body;
    const description = body["description"];
    const resourceName = body["resourceName"];
    const resourceWeight = body["resourceWeight"];
    const originPlanet = body["originPlanet"];
    const destination = body["destination"];
    const value = body["value"];

    // Checking if value is empty
    if (!description || !resourceName || !resourceWeight || !originPlanet || !destination || !value) {
        badRequestErrorHandler(res, "Invalid arguments");
    }

    // Contract attributes
    const contract = new Contract();
    contract.description = description;
    contract.resourceName = resourceName;
    contract.resourceWeight = resourceWeight;
    contract.originPlanet = originPlanet;
    contract.destination = destination;
    contract.value = value;

    const contractDAO = new ContractDAO();
    contractDAO.insert(contract)
        .then(() => res.send("Created successfully"))
        .catch(err => internalServerErrorHandler(res, err));
}

module.exports = { selectAllContracts, selectContractById, createContract }