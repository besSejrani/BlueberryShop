import React from "react";

// Layout
import Layout from "../Layout/index";

//Styles
import "../App/index.css";

// Redux
import { Provider } from "react-redux";
import { store } from "../Redux/store";

// Date Picker
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

// ========================================================================================================

const App = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Layout {...pageProps}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Component {...pageProps} />
        </MuiPickersUtilsProvider>
      </Layout>
    </Provider>
  );
};

export default App;
