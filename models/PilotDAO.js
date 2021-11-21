const ConnectionFactory = require("./ConnectionFactory");

class PilotDAO {
    constructor() {
        this.conn = null;
    }

    select(obj, res) {
        this.openConnection();
        const query = "SELECT * FROM pilots WHERE certification = ?";
        this.conn.get(query, obj.certification, (err, row) => {
            if (err) {
                res.status(500).send("Was not possible to execute select query in table pilots");
            }
            else {
                res.send(row);
            }
        });
        this.closeConnection();
    }

    insert(obj, res) {
        this.openConnection();
        const query = "INSERT INTO pilots (certification, name, age, credits, location) VALUES (?, ?, ?, ?, ?)";
        this.conn.run(query, Object.values(obj), (err, row) => {
            if (err) {
                res.status(500).send("Was not possible to execute insert query in table pilots");
            }
            else {
                res.redirect("/pilots")
            }
        });
        this.closeConnection();
    }

    update(obj, res) {
        this.openConnection();
        const query = "UPDATE pilots SET name = ?, age = ?, credits = ?, location = ? WHERE certification = ?";
        this.conn.run(query, Object.values(obj), (err, row) => {
            if (err) {
                res.status(500).send("Was not possible to execute update query in table pilots");
            }
            else {
                res.redirect("/pilots")
            }
        });
        this.closeConnection();
    }

    delete(obj, res) {
        this.openConnection();
        const query = "DELETE FROM pilots WHERE certification = ?";
        this.conn.run(query, Object.values(obj), (err, row) => {
            if (err) {
                res.status(500).send("Was not possible to execute update query in table pilots");
            }
            else {
                res.redirect("/pilots")
            }
        });
        this.closeConnection();
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