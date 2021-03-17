import React from "react";

// Layout
import Layout from "../Layout/index";

//Styles
import "../App/index.css";

// Redux
import { Provider } from "react-redux";
import { store } from "../Redux/store";

// ========================================================================================================

const App = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
};

export default App;
