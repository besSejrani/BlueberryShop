import React, { useEffect } from "react";

// Styles
import "../App/index.css";
import "../App/highlight.css";

// Date Picker
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

// Layout
import Layout from "../Layout/index";

// Apollo State
import { user } from "../Apollo/state/user/index";

// ========================================================================================================

const App = ({ Component, pageProps }) => {
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
        <Component {...pageProps} />
      </MuiPickersUtilsProvider>
    </Layout>
  );
};

export default App;
