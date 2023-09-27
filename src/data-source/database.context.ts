import { injectable } from "inversify";
import { DataSource } from "typeorm";

@injectable()
export class Database {
  private _appDataSource: DataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "username here",
    password: "password here",
    database: "db name here",
    synchronize: true,
    entities: [],
  });

  get appDataSource() {
    return this._appDataSource;
  }
}
