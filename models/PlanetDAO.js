const ConnectionFactory = require("./ConnectionFactory");

class PlanetDAO {
    constructor() {
        this.conn = null;
    }

    selectAll() {
        this.openConnection();
        const query = "SELECT * FROM planets";
        return new Promise((resolve, reject) => {
            this.conn.all(query, (err, row) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(row);
                }
            });
        })
        .finally(() => {
            this.closeConnection();
        });
    }
    
    select(obj) {
        this.openConnection();
        const query = "SELECT * FROM planets WHERE id = ?";
        return new Promise((resolve, reject) => {
            this.conn.get(query, obj.id, (err, row) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(row);
                }
            });
        })
        .finally(() => {
            this.closeConnection();
        });
    }

    insert(obj) {
        this.openConnection();
        const query = "INSERT INTO planets (id, name) VALUES (?, ?)";
        return new Promise((resolve, reject) => {
            this.conn.run(query, Object.values(obj), (err, row) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(row);
                }
            });
        })
        .finally(() => {
            this.closeConnection();
        });
    }

    update(obj) {
        this.openConnection();
        const query = "UPDATE planets SET name = ? WHERE id = ?";
        return new Promise((resolve, reject) => {
            this.conn.run(query, Object.values(obj), (err, row) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(row);
                }
            });
        })
        .finally(() => {
            this.closeConnection();
        });
    }

    delete(obj) {
        this.openConnection();
        const query = "DELETE FROM planets WHERE id = ?";
        return new Promise((resolve, reject) => {
            this.conn.run(query, Object.values(obj), (err, row) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(row);
                }
            });
        })
        .finally(() => {
            this.closeConnection();
        });
    }

    openConnection() {
        this.conn = new ConnectionFactory().connection;
    }

    closeConnection() {
        try {
            this.conn.close();
        }
        catch (error) {
            throw new Error("The connection can't be closed");
        }
    }
}

module.exports = PlanetDAO