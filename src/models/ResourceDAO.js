const DAOModel = require("./DAOModel");

class ResourceDAO extends DAOModel {
    selectAll() {
        const query = "SELECT * FROM resources";
        return super.selectAll(query);
    }
    
    select(obj) {
        const query = "SELECT * FROM resources WHERE id = ?";
        const values = [obj.id];
        return super.select(query, values);
    }

    insert(obj) {
        const query = "INSERT INTO resources (id, name) VALUES (?, ?)";
        const values = [obj.id, obj.name];
        return super.insert(query, values);
    }

    update(obj) {
        const query = "UPDATE resources SET name = ? WHERE id = ?";
        const values = [obj.name, obj.id];
        return super.update(query, values);
    }

    delete(obj) {
        const query = "DELETE FROM resources WHERE id = ?";
        const values = [obj.id];
        return super.delete(query, values);
    }
}

module.exports = ResourceDAO