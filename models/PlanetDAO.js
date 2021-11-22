const DAOModel = require("./DAOModel");

class PlanetDAO extends DAOModel {
    selectAll() {
        const query = "SELECT * FROM planets";
        return super.selectAll(query);
    }
    
    select(obj) {
        const query = "SELECT * FROM planets WHERE id = ?";
        const values = [obj.id];
        return super.select(query, values);
    }

    insert(obj) {
        const query = "INSERT INTO planets (id, name) VALUES (?, ?)";
        const values = [obj.id, obj.name];
        return super.insert(query, values);
    }

    update(obj) {
        const query = "UPDATE planets SET name = ? WHERE id = ?";
        const values = [obj.name, obj.id];
        return super.update(query, values);
    }

    delete(obj) {
        const query = "DELETE FROM planets WHERE id = ?";
        const values = [obj.id];
        return super.delete(query, values);
    }
}

module.exports = PlanetDAO