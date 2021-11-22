class Ship {
    constructor() {
        this._id = null;
        this._fuel_capacity = null;
        this._fuel_level = null;
        this._weight_capacity = null;
        this._pilot_certification = null;
    }

    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }

    get fuelCapacity() {
        return this._fuel_capacity;
    }

    set fuelCapacity(fuelCapacity) {
        this._fuel_capacity = fuelCapacity;
    }

    get fuelLevel() {
        return this._fuel_level;
    }

    set fuelLevel(fuelLevel) {
        this._fuel_level = fuelLevel;
    }

    get weightCapacity() {
        return this._weight_capacity;
    }

    set weightCapacity(weightCapacity) {
        this._weight_capacity = weightCapacity;
    }

    get pilotCertification() {
        return this._pilot_certification;
    }

    set pilotCertification(pilotCertification) {
        this._pilot_certification = pilotCertification;
    }
}

module.exports = Ship