import React, { useEffect } from "react";

// Styles
import "../App/index.css";
import "../App/highlight.css";

// Date Picker
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

// Apollo State
import { user } from "@Apollo/state/user/index";

// Layout

// SSR
import withApollo from "@Apollo/ssr";

// Stripe
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Layout from "../Layout/index";

// ========================================================================================================

const App = ({ Component, pageProps }) => {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_TEST_KEY);

  if (pageProps?.user) {
    user({
      _id: pageProps?.user?._id,
      username: pageProps?.user?.username,
      role: pageProps?.user?.role,
      profileImageUrl: pageProps?.user?.profileImageUrl,
    });
  }

  useEffect(() => {
    if (pageProps?.user) {
      user({
        _id: pageProps?.user?._id,
        username: pageProps?.user?.username,
        role: pageProps?.user?.role,
        profileImageUrl: pageProps?.user?.profileImageUrl,
      });
    }
    console.log("update user page _app", pageProps?.user);
  }, [pageProps?.user]);

  return (
    <Layout {...pageProps}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Elements stripe={stripePromise}>
          <Component {...pageProps} />
        </Elements>
      </MuiPickersUtilsProvider>
    </Layout>
  );
};

export default withApollo({ ssr: false })(App);
