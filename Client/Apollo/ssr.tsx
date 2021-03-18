// import withApollo from "next-with-apollo";
import { withApollo } from "next-apollo";
import {  InMemoryCache, ApolloClient } from "@apollo/client";

import { setContext } from "@apollo/client/link/context";
import { ui } from "./state/ui";

import { createUploadLink } from "apollo-upload-client";

// ========================================================================================================

const link = createUploadLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them


  if (token) {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  }
});



    const apolloClient = new ApolloClient({
      link: authLink.concat(link),
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
