import "module-alias/register";
import "reflect-metadata";
import Application from "./app";
import "dotenv/config";
console.clear();

export async function bootstrap() {
  new Application().listen();
}

bootstrap();
