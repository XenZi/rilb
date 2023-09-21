"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
class DatabaseConnection {
    constructor() {
        this.appDataSource = new typeorm_1.DataSource({
            type: "mysql",
            host: "host-here",
            port: 3306,
            username: "username-here",
            password: "password-here",
            database: "database-name-here",
        });
    }
    static getInstance() {
        if (!DatabaseConnection.instance) {
            DatabaseConnection.instance = new DatabaseConnection();
        }
        return DatabaseConnection.instance;
    }
    getDataSource() {
        return this.appDataSource;
    }
}
exports.default = DatabaseConnection;
