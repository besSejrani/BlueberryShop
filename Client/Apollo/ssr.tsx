// Apollo
import { InMemoryCache, ApolloClient } from "@apollo/client";
// SSR
import { withApollo } from "next-apollo";

// Upload
import { createUploadLink } from "apollo-upload-client";

// Apollo State
import { ui } from "./state/ui";
import { user } from "./state/user/index";
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
  uri: process.env.NEXT_PUBLIC_DEVELOPMENT_SERVER,
  credentials: "include",
  headers: {
    token,
  },
});
export const apolloClient = new ApolloClient({
  link,
  headers: {
    token,
  },
  cache,
  credentials: "include",
  ssrMode: true,
});
export default withApollo(apolloClient);
