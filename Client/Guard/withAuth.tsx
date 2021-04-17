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
    static async getInitialProps({ apolloClient, ...ctx }: NextContextWithApollo): Promise<{ user: {} | null }> {
      const token = ctx?.req?.headers?.cookie?.split("token=")[1]?.split(";")[0];

      const result = await apolloClient?.query<GetCurrentUserQuery>({
        query: GetCurrentUserDocument,
        context: {
          credentials: "include",
          headers: {
            token: token,
          },
        },
      });

      user({
        _id: result?.data?.getCurrentUser?._id,
        username: result?.data?.getCurrentUser?.username,
        role: result?.data?.getCurrentUser?.role,
        profileImageUrl: result?.data?.getCurrentUser?.profileImageUrl,
      });

      const isAdmin = result.data?.getCurrentUser?.role === "admin";

      if (!result || !result.data || !result.data?.getCurrentUser || !isAdmin) {
        redirect(ctx, "/register");
        return {
          user: null,
        };
      }

      return {
        user: result?.data?.getCurrentUser,
      };
    }

    render() {
      return <C {...this.props} />;
    }
  };
