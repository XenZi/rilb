import { injectable } from "inversify";
import { DataSource } from "typeorm";

@injectable()
export class Database {
  private _appDataSource: DataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root1234",
    database: "rilb",
    synchronize: true,
    entities: [],
  });

  get appDataSource() {
    return this._appDataSource;
  }
}
