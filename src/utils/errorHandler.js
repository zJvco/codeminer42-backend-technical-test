const internalServerErrorHandler = (res, err) => {
    res.status(500).send(err.message);
}

const badRequestErrorHandler = (res, err) => {
    res.status(400).send(err);
}

const unauthorizedErrorHandler = (res, err) => {
    res.status(401).send(err);
}

module.exports = { internalServerErrorHandler, badRequestErrorHandler, unauthorizedErrorHandler }