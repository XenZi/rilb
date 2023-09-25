import { User } from "@models/user.model";
import { injectable } from "inversify";
import { Database } from "src/data-source/database.context";

@injectable()
class PingService {
  constructor() {}
}

export default PingService;
