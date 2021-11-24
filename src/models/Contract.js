class Contract {
    constructor() {
        this._id = null;
        this._description = null;
        this._resourceName = null;
        this._resourceWeight = null;
        this._originPlanetId = null;
        this._destinationId = null;
        this._value = null;
        this._status = "open";
        this._pilotCertification = null;
    }

    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }

    get description() {
        return this._description;
    }

    set description(description) {
        this._description = description;
    }

    get resourceName() {
        return this._resourceName;
    }

    set resourceName(resourceName) {
        this._resourceName = resourceName;
    }

    get resourceWeight() {
        return this._resourceWeight;
    }

    set resourceWeight(resourceWeight) {
        this._resourceWeight = resourceWeight;
    }

    get originPlanetId() {
        return this._originPlanetId;
    }

    set originPlanetId(originPlanetId) {
        this._originPlanetId = originPlanetId;
    }

    get destinationId() {
        return this._destinationId;
    }

    set destinationId(destinationId) {
        this._destinationId = destinationId;
    }

    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value;
    }

    get status() {
        return this._status;
    }

    set status(status) {
        this._status = status;
    }

    get pilotCertification() {
        return this._pilotCertification;
    }

    set pilotCertification(pilotCertification) {
        this._pilotCertification = pilotCertification;
    }
}

module.exports = Contract