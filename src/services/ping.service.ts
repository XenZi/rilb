import { injectable } from "inversify";

@injectable()
class PingService {
  consoleFromService(): void {
    console.log("from server");
  }
}

export default PingService;
