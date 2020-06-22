import "reflect-metadata";
import { createConnection, getConnectionOptions } from "typeorm";
import { createExpressServer } from "routing-controllers";
import { UserController } from "./controllers/UserController";
import path from "path";

(async () => {
  const options = await getConnectionOptions(
    process.env.NODE_ENV || "development"
  );
  //   createConnection({ ...options, name: "default" })
  //     .then(async (connection) => {
  //       console.log("Inserting a new user into the database...");
  //       const user = new User();
  //       user.firstName = "Timber";
  //       user.lastName = "Saw";
  //       user.age = 25;
  //       await connection.manager.save(user);
  //       console.log("Saved a new user with id: " + user.id);

  //       console.log("Loading users from the database...");
  //       const users = await connection.manager.find(User);
  //       console.log("Loaded users: ", users);

  //       console.log(
  //         "Here you can setup and run express/koa/any other framework."
  //       );
  //     })
  //     .catch((error) => console.log(error));

  createConnection({ ...options, name: "default" })
    .then(async (_) => {
      const app = createExpressServer({
        cors: true,
        controllers: [UserController],
      });
      app.set("views", path.join(__dirname, "resources/views/"));
      app.set("view engine", "ejs");

      app.listen(3000);
      console.log("Server is up and running on port 3000.");
    })
    .catch((error) => console.log("Error: ", error));
})();
