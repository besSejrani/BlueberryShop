import { GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
import { ObjectId } from "mongodb";
import path from "path";

import { ObjectIdScalar } from "../types/ObjectId.scalar";
import { ObjectScalar } from "../types/Object.scalar";
import { TypegooseMiddleware } from "../../Middleware/typegoose";

// ========================================================================================================

// build TypeGraphQL executable schema
export default async function createSchema(): Promise<GraphQLSchema> {
  const schema = await buildSchema({
    // 1. add all typescript resolvers
    resolvers: [__dirname + "/../resolvers/**/*.ts"],
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
    // 2. use document converting middleware
    globalMiddlewares: [TypegooseMiddleware],
    // 3. use ObjectId scalar mapping
    scalarsMap: [
      { type: ObjectId, scalar: ObjectIdScalar },
      { type: Object, scalar: ObjectScalar },
    ],
    validate: false,
  });
  return schema;
}
