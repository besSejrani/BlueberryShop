import withApollo from "next-with-apollo";
import { ApolloProvider, InMemoryCache, ApolloClient } from "@apollo/client";

import { setContext } from "@apollo/client/link/context";
import { ui } from "./state/ui";

import { createUploadLink } from "apollo-upload-client";

const link = createUploadLink({
  uri: "http://localhost:4000/graphql",
});

// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = localStorage.getItem("token");
//   // return the headers to the context so httpLink can read them

//   if (token) {
//     return {
//       headers: {
//         ...headers,
//         authorization: token ? `Bearer ${token}` : "",
//       },
//     };
//   }
// });

export default withApollo(
  ({ initialState }) => {
    return new ApolloClient({
      link: link,
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
      }).restore(initialState || {}),
      ssrMode: typeof window === "undefined",
    });
  },
  {
    render: ({ Page, props }) => {
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} />
        </ApolloProvider>
      );
    },
  }
);
