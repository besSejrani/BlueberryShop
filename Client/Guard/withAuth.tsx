import React from "react";

// Guard
import redirect from "./redirect";
import { NextContextWithApollo } from "./nextContextWithApollo";

// Apollo
import { GetCurrentUserDocument, GetCurrentUserQuery } from "../Graphql/index";

// Apollo State
import { user } from "../Apollo/state/user/index";

// ================================================================================

export const withAuth = <T extends object>(C: React.FC<T>) =>
  class AuthComponent extends React.Component<T> {
    static async getInitialProps({ apolloClient, ...ctx }: NextContextWithApollo) {
      const result = await apolloClient?.query<GetCurrentUserQuery>({ query: GetCurrentUserDocument });

      user({
        _id: "",
        username: "",
        role: "admin",
      });

      // console.log(result);
      // console.log(user());

      // user().role !== "admin"

      // if (!result || !result.data || !result.data?.getCurrentUser) {
      //   redirect(ctx, "/register");
      //   return {
      //     me: null,
      //   };
      // }

      return {
        me: result?.data?.getCurrentUser,
      };
    }

    render() {
      return <C {...this.props} />;
    }
  };
