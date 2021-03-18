// import withApollo from "next-with-apollo";
import { withApollo } from "next-apollo";
import { InMemoryCache, ApolloClient, ApolloLink } from "@apollo/client";
import { ui } from "./state/ui";

import { createUploadLink } from "apollo-upload-client";

// ========================================================================================================

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers

  let token;

  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }
  operation.setContext({
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  return forward(operation);
});

const link = createUploadLink({
  uri: "http://localhost:4000/graphql",
});

const apolloClient = new ApolloClient({
  link: authMiddleware.concat(link),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          ui: {
            read() {
              return ui();
            },
          },
        },
      },
    },
  }),
  ssrMode: typeof window === "undefined",
});

export default withApollo(apolloClient);
