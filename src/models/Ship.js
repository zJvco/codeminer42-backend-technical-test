class Ship {
    constructor() {
        this._id = null;
        this._fuelCapacity = null;
        this._fuelLevel = null;
        this._weightCapacity = null;
        this._pilotCertification = null;
    }

    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }

    get fuelCapacity() {
        return this._fuelCapacity;
    }

    set fuelCapacity(fuelCapacity) {
        this._fuelCapacity = fuelCapacity;
    }

    get fuelLevel() {
        return this._fuelCapacity;
    }

    set fuelLevel(fuelLevel) {
        this._fuelLevel = fuelLevel;
    }

    get weightCapacity() {
        return this._weightCapacity;
    }

    set weightCapacity(weightCapacity) {
        this._weightCapacity = weightCapacity;
    }

    get pilotCertification() {
        return this._pilotCertification;
    }

    set pilotCertification(pilotCertification) {
        this._pilotCertification = pilotCertification;
    }
}

module.exports = Ship