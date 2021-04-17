import React from "react";

// Next
import { useRouter } from "next/router";

// Components
import Promotions from "@Components/Promotions/Promotions";

// SSR
import withApollo from "@Apollo/ssr";

// HOC
import { withNoAuth } from "@Guard/withNoAuth";

// ========================================================================================================

const Home: React.FC = () => {
  const { locale } = useRouter();

  return (
    <>
      {locale}
      <Promotions />
    </>
  );
};

export default withApollo({ ssr: true })(withNoAuth(Home));

// =================================================================
