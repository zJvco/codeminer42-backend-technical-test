const DAOModel = require("./DAOModel");

class ShipDAO extends DAOModel {
    selectAll() {
        const query = "SELECT * FROM ships";
        return super.selectAll(query);
    }

    select(obj) {
        const query = "SELECT * FROM ships WHERE id = ?";
        const values = [obj.id];
        return super.select(query, values);
    }

    insert(obj) {
        const query = "INSERT INTO ships (id, fuel_capacity, fuel_level, weight_capacity, pilot_certification) VALUES (?, ?, ?, ?, ?)";
        const values = [obj.id, obj.fuelCapacity, obj.fuelLevel, obj.weightCapacity, obj.pilotCertification];
        return super.insert(query, values);
    }

    update(obj) {
        const query = "UPDATE ships SET fuel_capacity = ?, fuel_level = ?, weight_capacity = ?, pilot_certification = ? WHERE id = ?";
        const values = [obj.fuel_capacity, obj.fuel_level, obj.weight_capacity, obj.pilot_certification, obj.id];
        return super.update(query, values);
    }

    delete(obj) {
        const query = "DELETE FROM ships WHERE id = ?";
        const values = [obj.id];
        return super.delete(query, values);
    }
}

module.exports = ShipDAO