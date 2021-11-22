const ConnectionFactory = require("./ConnectionFactory");

class PilotDAO {
    constructor() {
        this.conn = null;
    }

    selectAll() {
        this.openConnection();
        const query = "SELECT * FROM pilots";
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
        const query = "SELECT * FROM pilots WHERE certification = ?";
        return new Promise((resolve, reject) => {
            this.conn.get(query, obj.certification, (err, row) => {
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
        const query = "INSERT INTO pilots (certification, name, age, credits, location) VALUES (?, ?, ?, ?, ?)";
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
        const query = "UPDATE pilots SET name = ?, age = ?, credits = ?, location = ? WHERE certification = ?";
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
        const query = "DELETE FROM pilots WHERE certification = ?";
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

module.exports = PilotDAO