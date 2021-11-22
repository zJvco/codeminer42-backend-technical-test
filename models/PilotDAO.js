const DAOModel = require("./DAOModel");

class PilotDAO extends DAOModel {
    selectAll() {
        const query = "SELECT * FROM pilots";
        return super.selectAll(query);
    }

    select(obj) {
        const query = "SELECT * FROM pilots WHERE certification = ?";
        const values = [obj.certification];
        return super.select(query, values);
    }

    insert(obj) {
        const query = "INSERT INTO pilots (certification, name, age, credits, location) VALUES (?, ?, ?, ?, ?)";
        const values = [obj.certification, obj.name, obj.age, obj.credits, obj.location];
        return super.insert(query, values);
    }

    update(obj) {
        const query = "UPDATE pilots SET name = ?, age = ?, credits = ?, location = ? WHERE certification = ?";
        const values = [obj.name, obj.age, obj.credits, obj.location, obj.certification];
        return super.update(query, values);
    }

    delete(obj) {
        const query = "DELETE FROM pilots WHERE certification = ?";
        const values = [obj.certification];
        return super.delete(query, values);
    }
}

module.exports = PilotDAO