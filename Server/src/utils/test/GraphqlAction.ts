import { graphql, GraphQLSchema } from "graphql";

import createSchema from "../../Graphql/schema/index";

// ========================================================================================================

interface Options {
  source: string;
  variableValues?: any;
}

let schema: GraphQLSchema;

export const TestGraphqlAction = async ({ source, variableValues }: Options) => {
  if (!schema) {
    schema = await createSchema();
  }

  return graphql({
    schema,
    source,
    variableValues,
  });
};
