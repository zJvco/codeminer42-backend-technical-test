const DAOModel = require("./DAOModel");

class PilotDAO extends DAOModel {
    selectAll() {
        const query = "SELECT * FROM pilots";
        return super.selectAll(query);
    }

    select(obj) {
        const query = "SELECT * FROM pilots WHERE certification = ?";
        return super.select(query, obj.certification);
    }

    insert(obj) {
        const query = "INSERT INTO pilots (certification, name, age, credits, location) VALUES (?, ?, ?, ?, ?)";
        return super.insert(query, Object.values(obj));
    }

    update(obj) {
        const query = "UPDATE pilots SET name = ?, age = ?, credits = ?, location = ? WHERE certification = ?";
        return super.update(query, Object.values(obj))
    }

    delete(obj) {
        const query = "DELETE FROM pilots WHERE certification = ?";
        return super.delete(query, Object.values(obj))
    }
}

module.exports = PilotDAO