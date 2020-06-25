import "reflect-metadata";
import { createConnection, getConnectionOptions } from "typeorm";
import { buildSchema } from "type-graphql";
import { ItemResolver } from "./modules/item/ItemResolver";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import Express from "express";
import path from "path";

const main = async () => {
  const options = await getConnectionOptions(
    process.env.NODE_ENV || "development"
  );
  await createConnection({ ...options, name: "default" })
    .then(async () => console.log("Typeorm Success."))
    .catch((err) => console.log("Typeorm Error: ", err));

  // Building schema as well
  const schema = await buildSchema({
    resolvers: [ItemResolver],
  });

  const apolloServer = new ApolloServer({
    schema,
  });

  const app = Express();

  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000", // 4000 ?
    })
  );

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("server started on http://localhost:4000/graphql");
  });
};

main().catch((err) => console.log(err));
