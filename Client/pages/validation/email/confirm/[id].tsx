import React, { useEffect } from "react";

// Next
import { useRouter } from "next/router";

// Apollo
import { useConfirmUserMutation } from "@Graphql/index";

// ========================================================================================================

const ConfirmUser = ({ query }) => {
  const router = useRouter();
  const [confirmUser] = useConfirmUserMutation();

  useEffect(() => {
    confirm();
  }, []);

  const confirm = async () => {
    const { data } = await confirmUser({ variables: { token: query.id } });

    router.push("/");
  };

  return <div> </div>;
};

export default ConfirmUser;

ConfirmUser.getInitialProps = async ({ query }) => {
  return { query };
};

// ========================================================================================================
