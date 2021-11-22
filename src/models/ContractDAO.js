const DAOModel = require("./DAOModel");

class ContractDAO extends DAOModel {
    selectAll() {
        const query = "SELECT * FROM contracts";
        return super.selectAll(query);
    }
    
    select(obj) {
        const query = "SELECT * FROM contracts WHERE id = ?";
        const values = [obj.id];
        return super.select(query, values);
    }

    insert(obj) {
        const query = "INSERT INTO contracts (id, description, resource_name, resource_weight, origin_planet, destination, value) VALUES (?, ?, ?, ?, ?, ?, ?)";
        const values = [obj.id, obj.description, obj.resourceName, obj.resourceWeight,  obj.originPlanet, obj.destination, obj.value];
        return super.insert(query, values);
    }

    update(obj) {
        const query = "UPDATE contracts SET status = ?, pilot_certification = ? WHERE id = ?";
        const values = [obj.status, obj.pilotCertification, obj.id];
        return super.update(query, values);
    }

    delete(obj) {
        const query = "DELETE FROM contracts WHERE id = ?";
        const values = [obj.id];
        return super.delete(query, values);
    }
}

module.exports = ContractDAO