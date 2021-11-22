const config = require("../../config.json");
const sqlite = require("sqlite3");

class ConnectionFactory {
    constructor() {
        this.name = config.database.name;
        this.database = sqlite;
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