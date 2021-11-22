const DAOModel = require("./DAOModel");

class PlanetDAO extends DAOModel {
    selectAll() {
        const query = "SELECT * FROM planets";
        return super.selectAll(query);
    }
    
    select(obj) {
        const query = "SELECT * FROM planets WHERE id = ?";
        return super.select(query, obj.id);
    }

    insert(obj) {
        const query = "INSERT INTO planets (id, name) VALUES (?, ?)";
        return super.insert(query, Object.values(obj));
    }

    update(obj) {
        const query = "UPDATE planets SET name = ? WHERE id = ?";
        return super.update(query, Object.values(obj));
    }

    delete(obj) {
        const query = "DELETE FROM planets WHERE id = ?";
        return super.delete(query, Object.values(obj));
    }
}

module.exports = PlanetDAO