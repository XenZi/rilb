import { DataSource } from "typeorm";

class DatabaseConnection {
  private static instance: DatabaseConnection;
  private appDataSource: DataSource;

  private constructor() {
    this.appDataSource = new DataSource({
      type: "mysql",
      host: "host-here",
      port: 3306,
      username: "username-here",
      password: "password-here",
      database: "database-name-here",
    });
  }

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  public getDataSource(): DataSource {
    return this.appDataSource;
  }
}

export default DatabaseConnection;
