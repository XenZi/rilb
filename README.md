# rilb - Real Backend Starter

**rilb** (Real Backend Starter) is your launchpad for crafting Node.js applications with Express. This comprehensive toolkit lays the groundwork for creating robust and maintainable backend solutions, all elegantly coded in TypeScript. This starter package is your gateway to efficient development, featuring Inversify for seamless dependency injection, Inversify Express Utils for harnessing the full potential of the Express framework, TypeORM for a versatile ORM backbone with MySQL compatibility, JWT for secure authentication, Bcryptjs for fortified security, and an innovative error-handling system rooted in exceptions.

## Key Features

- **rilb-cli**: rilb brings rilb-cli tool that can be found [here](https://github.com/XenZi/rilb-cli).

- **Expressive TypeScript**: rilb brings TypeScript and Express.js together, infusing your backend with strong typing and expressive code.

- **Dependency Injection Delight**: Harness the power of Inversify for effortless dependency injection, promoting modular design and testing simplicity.

- **ORM**: TypeORM is seamlessly integrated, streamlining database interactions with support for both SQL databases and MongoDB. If you want to use any other database that is not MySQL you'll have to install dependencies for connection with the database.

- **Authentication**: Fortify your application with JWT for trusted and secure authentication.

- **Security**: BCryptJS joins to encrypt passwords, fortifying your app's security posture.

- **Elegant Error Handling**: Error handling system, driven by custom exceptions and polished reponses, simplifies error management inside of the app.

- **Class Validator**: You can validate your classes together with class-validator package.

- **Swagger**: You can create a basic endpoint documentation with examples by using implemented Swagger definition.

## Getting Started

Kickstart your project with these steps:

1. Clone the repository: `git clone https://github.com/XenZi/rilb.git`
2. Install dependencies: `npm install`
3. Configure your database connection in `src/data-source/database.context.ts`.
4. Run the application: `npm run dev`

## Project Structure

The project's architecture is designed for scalability and maintainability:

- `src/controllers`: Home to your Express route controllers.
- `src/models`: Define your data models with TypeORM entities.
- `src/repositories`: Repository classes for database interactions.
- `src/services`: Hosts your business logic and essential services.
- `src/exceptions`: Houses custom error classes.
- `src/config`: Holds configuration files.
- `src/securty`: Holds security files.
- `src/dto`: Holds data transfer objects.
- `src/enums`: Holds enums.
- `src/index.ts`: The entry point of your application.
- `src/app.ts`: Application class of your application.
- `src/container.ts`: Dependency injection container of application.

## Configuration

- Tailor your database connection in `src/data-source/database.context.ts`. TypeORM supports both SQL databases and MongoDB with the right adjustments.

## Running the Application

- Launch your application with `npm run dev`.
- By default, the application runs on port 3000. Modify this in the configuration (.env) to suit your needs.

## RILB CLI

- You can use this tool after installing it from my github (I didn't publish it to the npm, but it is on the github). [here](https://github.com/XenZi/rilb-cli).
- Usage: rilb generate <controller, service, repository>
- It will ask you for a name of controller, service or repository.
- When you write it down, it will generate entity inside of src/{entity} folder, and add dependency into the container.ts file.

## CREATING ANY SERVICE, CONTROLLER OR REPOSITORY

## EXAMPLE

Model

```typescript
import { IsEmail, MaxLength, MinLength } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  private id: number;

  @Column({
    unique: true,
  })
  @MinLength(3, {
    message: "Username must be longer than 2 characters.",
  })
  @MaxLength(15, {
    message: "Username must be between 3 and 15 characters.",
  })
  private username: string;

  @Column({
    unique: true,
  })
  @IsEmail()
  private email: string;

  @Column()
  @MinLength(8, {
    message: "Password must be minimum 8 characters long.",
  })
  private password: string;
}
```

Repository

```typescript
import { injectable } from "inversify";
import { Database } from "src/data-source/database.context";

@injectable()
class TestRepository {
  constructor(private readonly database: Database) {}
}

export default TestRepository;
```

## Testing

- Feel free to write tests using your preferred testing libraries (e.g., Jest) in the `tests` directory.

## License

This project is licensed under the MIT License. Refer to the [LICENSE](LICENSE) file for details.

## Contributions Welcome

We welcome contributions! Whether it's opening issues or submitting pull requests, your input is valuable.

## Acknowledgments

- A heartfelt thank you to the open-source community for the tools and libraries that make this starter possible.

Start crafting amazing backends with rilb! 🚀
