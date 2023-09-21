"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class Server {
    constructor() {
        this._app = (0, express_1.default)();
        this._port = 3000;
    }
    get app() {
        return this._app;
    }
    get port() {
        return this._port;
    }
}
exports.default = Server;
