import React, { useEffect } from "react";

// Next
import { useRouter } from "next/router";

// Apollo
import { useConfirmUserMutation } from "@Graphql/index";

// SSR
import withApollo from "@Apollo/ssr";

// ========================================================================================================

const ConfirmUser = ({ query }) => {
  const router = useRouter();
  const [confirmUser] = useConfirmUserMutation();

  useEffect(() => {
    confirm();
  }, []);

  const confirm = async () => {
    await confirmUser({ variables: { token: query.id } });

    router.push("/");
  };

  return <div> </div>;
};

ConfirmUser.getInitialProps = async ({ query }) => ({ query });

export default withApollo({ ssr: true })(ConfirmUser);

// ========================================================================================================
