const ConnectionFactory = require("./ConnectionFactory");

class DAOModel {
    constructor() {
        this.conn = null;
    }

    selectAll(query) {
        this.openConnection();
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

    select(query, filter) {
        this.openConnection();
        return new Promise((resolve, reject) => {
            this.conn.get(query, filter, (err, row) => {
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

    insert(query, filter) {
        this.openConnection();
        return new Promise((resolve, reject) => {
            this.conn.run(query, filter, (err, row) => {
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

    update(query, filter) {
        this.openConnection();
        return new Promise((resolve, reject) => {
            this.conn.run(query, filter, (err, row) => {
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

    delete(query, filter) {
        this.openConnection();
        return new Promise((resolve, reject) => {
            this.conn.run(query, filter, (err, row) => {
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