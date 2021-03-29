import React, { useEffect } from "react";

// Components
import Promotions from "@Components/Promotions/Promotions";

// SSR
import withApollo from "@Apollo/ssr";

// ========================================================================================================

const Home: React.FC = () => {
  return (
    <>
      <Promotions />
    </>
  );
};

export default withApollo({ ssr: true })(Home);

// =================================================================
