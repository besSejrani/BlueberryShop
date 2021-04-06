import React from "react";

// Next
import Router from "next/router";

// Guard
// import redirect from "./redirect";
// import { NextContextWithApollo } from "./nextContextWithApollo";

// Apollo
import { apolloClient } from "@Apollo/ssr";
import { GetCurrentUserDocument, GetCurrentUserQuery } from "../Graphql/index";

// Apollo State
import { user } from "../Apollo/state/user/index";

// ================================================================================

export const withAuth = <T extends object>(C: React.FC<T>) =>
  class AuthComponent extends React.Component<T> {
    componentDidMount = async () => {
      const result = await apolloClient?.query<GetCurrentUserQuery>({ query: GetCurrentUserDocument });

      if (localStorage.getItem("token")) {
        user({
          _id: result.data.getCurrentUser._id,
          username: result.data.getCurrentUser.username,
          role: result.data.getCurrentUser.role,
        });
      }

      if (!result || !result.data || !result.data?.getCurrentUser || user().role !== "admin") {
        // redirect(ctx, "/register");

        Router.replace("/register");
      }

      // return {
      //   me: result?.data?.getCurrentUser,
      // };
    };

    render() {
      return <C {...this.props} />;
    }
  };
