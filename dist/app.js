"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const express_1 = __importDefault(require("express"));
const inversify_express_utils_1 = require("inversify-express-utils");
const container_1 = require("./container");
class Application {
    constructor() { }
    listen() {
        const server = new inversify_express_utils_1.InversifyExpressServer(container_1.container);
        server.setConfig((app) => {
            app.use(express_1.default.json());
        });
        const app = server.build();
        app.listen(3000, () => {
            console.log("Server rrunning onn: 3000");
        });
    }
}
exports.default = Application;
