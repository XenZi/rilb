"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
class Logger {
    constructor() {
        this.logger = (0, winston_1.createLogger)({
            level: "info",
            format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), winston_1.format.printf(({ timestamp, level, message }) => {
                return `[${timestamp}] ${level}: ${message}`;
            })),
            transports: [
                new winston_1.transports.Console(),
                new winston_1.transports.File({ filename: "error.log", level: "error" }),
                new winston_1.transports.File({ filename: "combined.log" }),
            ],
        });
    }
    info(message) {
        this.logger.info(message);
    }
    error(message, error) {
        error
            ? this.logger.error(`${message} - ${error.message}`)
            : this.logger.error(message);
    }
    warn(message) {
        this.logger.warn(message);
    }
    debug(message) {
        this.logger.debug(message);
    }
}
exports.default = Logger;
