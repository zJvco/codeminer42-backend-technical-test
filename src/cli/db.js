const { exec } = require("child_process");

const ConnectionFactory = require("../models/ConnectionFactory");
const tables = require("../models/sql/schema");
const model = require("../models/sql/model");

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
        exec("rm -f intergalatic.db");
    }
    catch (error) {
        throw new Error("Not was possible to drop database");
    }
}

module.exports.populatedb = () => {
    const cf = new ConnectionFactory();

    try {
        const conn = cf.connection;
        Object.keys(model).map((key) => {
            conn.run(model[key]);
        });
    }
    catch (error) {
        throw new Error("Not was possible to populate database, make sure you created database before");
    }
}