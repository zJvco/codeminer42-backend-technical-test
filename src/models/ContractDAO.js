const DAOModel = require("./DAOModel");

class ContractDAO extends DAOModel {
    selectAll() {
        const query = "SELECT * FROM contracts";
        return super.selectAll(query);
    }
    
    selectById(obj) {
        const query = "SELECT * FROM contracts WHERE id = ?";
        const values = [obj.id];
        return super.select(query, values);
    }

    selectAllByPilotCertification(obj) {
        const query = "SELECT * FROM contracts WHERE pilot_certification = ?";
        const values = [obj.pilotCertification];
        return super.selectAll(query, values);
    }
    
    selectByPilotCertification(obj) {
        const query = "SELECT * FROM contracts WHERE pilot_certification = ?";
        const values = [obj.pilotCertification];
        return super.select(query, values);
    }

    insert(obj) {
        const query = "INSERT INTO contracts (id, description, resource_name, resource_weight, origin_planet_id, destination_id, value, status, pilot_certification) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        const values = [obj.id, obj.description, obj.resourceName, obj.resourceWeight,  obj.originPlanetId, obj.destinationId, obj.value, obj.status, obj.pilotCertification];
        return super.insert(query, values);
    }

    update(obj) {
        const query = "UPDATE contracts SET description = ?, resource_name = ?, resource_weight = ?, origin_planet_id = ?, destination_id = ?, value = ?, status = ?, pilot_certification = ? WHERE id = ?";
        const values = [obj.description, obj.resourceName, obj.resourceWeight, obj.originPlanetId, obj.destinationId, obj.value, obj.status, obj.pilotCertification, obj.id];
        return super.update(query, values);
    }

    delete(obj) {
        const query = "DELETE FROM contracts WHERE id = ?";
        const values = [obj.id];
        return super.delete(query, values);
    }
}

module.exports = ContractDAO