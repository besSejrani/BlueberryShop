// Apollo
import { InMemoryCache, ApolloClient } from "@apollo/client";

// Apollo State
import { ui } from "./state/ui";
import { user } from "./state/user/index";

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
        user: {
          read() {
            return user();
          },
        },
      },
    },
  },
});

let token;

if (typeof window !== "undefined") {
  token = window.localStorage.getItem("token");
}

const link = createUploadLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
});

export const apolloClient = new ApolloClient({
  link: link,
  headers: {
    token: token,
  },
  cache,
  credentials: "include",
  ssrMode: true,
});

export default withApollo(apolloClient);
