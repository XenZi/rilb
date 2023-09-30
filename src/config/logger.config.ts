import { injectable } from "inversify";
import winston, {
  Logger as WinstonLogger,
  transports,
  createLogger,
  format,
} from "winston";

@injectable()
class Logger {
  private logger: WinstonLogger;

  constructor() {
    this.logger = createLogger({
      level: "info",
      format: format.combine(
        format.colorize(),
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.printf(({ timestamp, level, message }) => {
          return `[${timestamp}] ${level}: ${message}`;
        })
      ),
      transports: [
        new transports.Console(),
        new transports.File({
          filename: "./src/logs/error.log",
          level: "error",
        }),
        new transports.File({ filename: "./src/logs/combined.log" }),
      ],
    });
  }

  info(message: string): void {
    this.logger.info(message);
  }

  error(message: string, error?: Error): void {
    error
      ? this.logger.error(`${message} - ${error.message}`)
      : this.logger.error(message);
  }

  warn(message: string): void {
    this.logger.warn(message);
  }

  debug(message: string): void {
    this.logger.debug(message);
  }
}

export default Logger;
