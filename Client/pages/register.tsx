import React from "react";

// Components
import SigninSignup from "@Components/Register/SigninSignup/SigninSignup";

// SSR
import withApollo from "@Apollo/ssr";

// ========================================================================================================

const Register = () => <SigninSignup />;

export default withApollo({ ssr: true })(Register);

// ========================================================================================================
