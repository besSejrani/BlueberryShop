import { GraphQLScalarType, Kind } from "graphql";

export const ObjectScalar = new GraphQLScalarType({
  name: "Object",
  description: "Mongo object id scalar type",
  serialize(value: unknown): object {
    // check the type of received value
    if (!(value instanceof Object)) {
      throw new Error("ObjectScalar can only serialize Object values");
    }
    return value; // value sent to the client
  },
  parseValue(value: unknown): object | null {
    // check the type of received value
    if (typeof value !== "object") {
      throw new Error("ObjectScalar can only parse object values");
    }

    return value; // value from the client input variables
  },
  parseLiteral(ast): object {
    // check the type of received value
    if (ast.kind !== Kind.OBJECT) {
      throw new Error("ObjectScalar can only parse string values");
    }
    return new Object(ast); // value from the client query
  },
});
