import React from "react";

// Auth
import redirect from "./redirect";

// Apollo
// import { useGetCurrentUserQuery } from "../Graphql/index";
import { NextContextWithApollo } from "./nextContextWithApollo";

// Apollo State
import { ui } from "../Apollo/state/ui";

// ================================================================================

export const withAuth = <T extends object>(C: React.FC<T>) =>
  class AuthComponent extends React.Component<T> {
    static async getInitialProps({ apolloClient, ...ctx }: NextContextWithApollo) {
      // const response = await apolloClient.query<MeQuery>({ query: meQuery });

      console.log(!ui().isAdmin);

      if (ui().isAdmin) {
        redirect(ctx, "/register");
        return {
          me: null,
        };
      }

      return {
        auth: true,
      };
    }

    render() {
      return <C {...this.props} />;
    }
  };
