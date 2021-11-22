const { internalServerErrorHandler, badRequestErrorHandler } = require("../utils/errorHandler");

const Resource = require("../models/Resource");
const ResourceDAO = require("../models/ResourceDAO");

// Select all resources
const selectAllResources = (req, res) => {
    const resourceDAO = new ResourceDAO();
    resourceDAO.selectAll()
        .then(resources => res.json(resources))
        .catch(err => internalServerErrorHandler(res, err));
}

// Select resource by id
const selectResource = (req, res) => {
    const id = req.params.id;

    const resource = new Resource();
    resource.id = id;

    const resourceDAO = new ResourceDAO();
    resourceDAO.select(resource)
        .then(resource => res.json(resource))
        .catch(err => internalServerErrorHandler(res, err));
}

// Create resource
const createResource = (req, res) => {
    const body = req.body;
    const name = body["name"];

    // Checking if name is empty
    if (!name) {
        badRequestErrorHandler(res, "Invalid arguments");
    }

    const resource = new Resource();
    resource.name = name;

    const resourceDAO = new ResourceDAO();
    resourceDAO.insert(resource)
        .then(() => res.send("Created successfully"))
        .catch(err => internalServerErrorHandler(res, err));
}

module.exports = { selectAllResources, selectResource, createResource }