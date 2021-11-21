const { exec } = require("child_process");

const ConnectionFactory = require("../models/ConnectionFactory");
const tables = require("../models/schema");

module.exports.createdb = () => {
    const cf = new ConnectionFactory();

    try {
        const conn = cf.connection;
        Object.keys(tables).map((key) => {
            conn.run(tables[key]);
        });
        conn.close();
    }
    catch (error) {
        throw new Error("Not was possible to create database");
    }
}

module.exports.dropdb = () => {
    try {
        exec("rm -r intergalatic.db");
    }
    catch (error) {
        throw new Error("Not was possible to drop database");
    }
}