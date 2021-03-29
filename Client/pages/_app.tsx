import React from "react";

// Layout
import Layout from "../Layout/index";

//Styles
import "../App/index.css";
import "../App/highlight.css"

// Date Picker
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

// ========================================================================================================

const App = ({ Component, pageProps }) => {
  return (
    <Layout {...pageProps}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Component {...pageProps} />
      </MuiPickersUtilsProvider>
    </Layout>
  );
};

export default App;
