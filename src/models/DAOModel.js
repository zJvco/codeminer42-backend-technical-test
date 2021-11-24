const ConnectionFactory = require("./ConnectionFactory");

class DAOModel {
    constructor() {
        this.conn = null;
    }

    selectAll(query, params) {
        this.openConnection();
        return new Promise((resolve, reject) => {
            this.conn.all(query, params, (err, row) => {
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

    select(query, params) {
        this.openConnection();
        return new Promise((resolve, reject) => {
            this.conn.get(query, params, (err, row) => {
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

    insert(query, params) {
        this.openConnection();
        return new Promise((resolve, reject) => {
            this.conn.run(query, params, (err, row) => {
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

    update(query, params) {
        this.openConnection();
        return new Promise((resolve, reject) => {
            this.conn.run(query, params, (err, row) => {
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

    delete(query, params) {
        this.openConnection();
        return new Promise((resolve, reject) => {
            this.conn.run(query, params, (err, row) => {
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

module.exports = DAOModel