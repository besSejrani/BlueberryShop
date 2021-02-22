import { GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
// import { ObjectId } from "mongodb";
import path from "path";

// import { ObjectIdScalar } from "../types/ObjectId.scalar";
// import { TypegooseMiddleware } from "../../middlewares/typegoose";

// build TypeGraphQL executable schema
export default async function createSchema(): Promise<GraphQLSchema> {
  const schema = await buildSchema({
    // 1. add all typescript resolvers
    resolvers: [__dirname + "/../resolvers/**/*.ts"],
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
    // // 2. use document converting middleware
    // globalMiddlewares: [TypegooseMiddleware],
    // // 3. use ObjectId scalar mapping
    // scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
    validate: false,
  });
  return schema;
}
