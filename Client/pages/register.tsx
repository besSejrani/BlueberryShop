import React from "react";

// Components
import SigninSignup from "@Components/SigninSignup/SigninSignup";

// SSR
import withApollo from "@Apollo/ssr";

// ========================================================================================================

const register = () => {
  return <SigninSignup />;
};

export default withApollo({ ssr: true })(register);
