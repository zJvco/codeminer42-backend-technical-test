class Pilot {
    constructor() {
        this._certification;
        this._name;
        this._age;
        this._credits;
        this._location;
    }

    get certification() {
        return this._certification;
    }

    set certification(certification) {
        this._certification = certification;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    }

    get age() {
        return this._age;
    }

    set age(age) {
        this._age = age;
    }

    get credits() {
        return this._credits;
    }

    set credits(credits) {
        this._credits = credits;
    }

    get location() {
        return this._location;
    }

    set location(location) {
        this._location = location;
    }
}

module.exports = Pilot