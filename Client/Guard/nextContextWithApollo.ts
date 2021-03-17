import { NextPageContext } from "next";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";

export interface NextContextWithApollo extends NextPageContext {
  apolloClient: ApolloClient<NormalizedCacheObject>;
  githubApolloClient: ApolloClient<NormalizedCacheObject>;
}
