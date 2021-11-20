class ConnectionFactory {
    constructor() {
        this.name = require("../config.json").database.name;
        this.database = require("sqlite3");
        this.conn = null;
    }

    // Connetion to database
    get connection() {
        try {
            this.conn = new this.database.Database(this.name);
        }
        catch (error) {
            throw new Error("Database error");
        }
        return this.conn;
    }
}

module.exports = ConnectionFactory;