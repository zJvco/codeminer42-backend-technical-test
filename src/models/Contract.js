class Contract {
    constructor() {
        this._id = null;
        this._description = null;
        this._resourceName = null;
        this._resourceWeight = null;
        this._originPlanet = null;
        this._destination = null;
        this._value = null;
        this._status = 0;
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

    get originPlanet() {
        return this._originPlanet;
    }

    set originPlanet(originPlanet) {
        this._originPlanet = originPlanet;
    }

    get destination() {
        return this._destination;
    }

    set destination(destination) {
        this._destination = destination;
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