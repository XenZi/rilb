"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
const ping_service_1 = __importDefault(require("./services/ping.service"));
const inversify_1 = require("inversify");
require("./controller/ping.controller");
require("./controller/test.controller");
exports.container = new inversify_1.Container({
    defaultScope: "Singleton",
});
exports.container.bind(ping_service_1.default).toSelf();
