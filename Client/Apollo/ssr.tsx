// Apollo
import { InMemoryCache, ApolloClient, ApolloLink } from "@apollo/client";

// Apollo State
import { ui } from "./state/ui";

// Upload
import { createUploadLink } from "apollo-upload-client";

// SSR
import { withApollo } from "next-apollo";

// ========================================================================================================

const cache = new InMemoryCache({
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
});

const authMiddleware = new ApolloLink((operation, forward) => {
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
  credentials: "same-origin",
});

const apolloClient = new ApolloClient({
  link: authMiddleware.concat(link),
  cache,
  ssrMode: true,
});

export default withApollo(apolloClient);
