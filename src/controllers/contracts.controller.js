const { internalServerErrorHandler, badRequestErrorHandler } = require("../utils/errorHandler");
const { validateNumber, validateString } = require("../utils/dataTypeValidator");

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
    contractDAO.selectById(contract)
        .then(contract => res.json(contract))
        .catch(err => internalServerErrorHandler(res, err));
}

// Create contract
const createContract = (req, res) => {
    const body = req.body;
    const description = body["description"];
    const resourceName = body["resourceName"];
    const resourceWeight = body["resourceWeight"];
    const originPlanetId = body["originPlanetId"];
    const destinationId = body["destinationId"];
    const value = body["value"];

    // Checking if value is empty
    if (!description || !resourceName || !resourceWeight || !originPlanetId || !destinationId || !value) {
        return badRequestErrorHandler(res, "Invalid arguments");
    }
    else if (!validateNumber(resourceWeight, originPlanetId, destinationId, value)) {
        return badRequestErrorHandler(res, "Invalid arguments");
    }
    else if (!validateString(description, resourceName)) {
        return badRequestErrorHandler(res, "Invalid arguments");
    }
    else if (resourceName.toLowerCase() != "water" && resourceName.toLowerCase() != "mineral" && resourceName.toLowerCase() != "food") {
        return badRequestErrorHandler(res, "You can insert only specify resources like water, minerals or food");
    }

    // Contract attributes
    const contract = new Contract();
    contract.description = description.toLowerCase();
    contract.resourceName = resourceName.toLowerCase();
    contract.resourceWeight = resourceWeight;
    contract.originPlanetId = originPlanetId;
    contract.destinationId = destinationId;
    contract.value = value;

    const contractDAO = new ContractDAO();
    contractDAO.insert(contract)
        .then(() => res.send("Created successfully"))
        .catch(err => internalServerErrorHandler(res, err));
}

module.exports = { selectAllContracts, selectContractById, createContract }