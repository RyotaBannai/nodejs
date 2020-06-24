import "reflect-metadata";
import { createConnection, getConnectionOptions } from "typeorm";
import { createExpressServer } from "routing-controllers";
import { UserController } from "./controllers/UserController";
import { ItemController } from "./controllers/ItemController";
import { ListController } from "./controllers/ListController";
import { FolderController } from "./controllers/FolderController";
import path from "path";

(async () => {
  const options = await getConnectionOptions(
    process.env.NODE_ENV || "development"
  );
  createConnection({ ...options, name: "default" })
    .then(async (_) => {
      const app = createExpressServer({
        cors: true,
        controllers: [
          UserController,
          ItemController,
          FolderController,
          ListController,
        ],
      });
      app.set("views", path.join(__dirname, "resources/views/"));
      app.set("view engine", "ejs");

      app.listen(3000);
      console.log("Server is up and running on port 3000.");
    })
    .catch((error) => console.log("Error: ", error));
})();
