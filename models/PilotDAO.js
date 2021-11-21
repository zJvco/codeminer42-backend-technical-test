const ConnectionFactory = require("./ConnectionFactory");

class PilotDAO {
    constructor() {
        this.conn = null;
    }

    select(obj) {
        //
    }

    insert(obj) {
        //
    }

    update(obj) {
        //
    }

    delete(obj) {
        //
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