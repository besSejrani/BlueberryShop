import React from "react";

// Layout
import Layout from "../Layout/index";

//Styles
import "../App/index.css";

// Redux
import { Provider } from "react-redux";
import { store } from "../Redux/store";
import { redirectUser } from "../auth";

// Apollo State
import { ui } from "../Apollo/state/ui";

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

App.getInitialProps = async ({ Component, ctx }) => {
  const admin = ui().isAdmin;

  console.log("admin", admin);

  const token = true;

  let props = {};
  if (Component.getInitialProps) {
    props = await Component.getInitialProps(ctx);
  }

  console.log(token);
  if (!token) {
    const isProtectedRoute = ctx.pathname === "/admin/dashboards";

    if (isProtectedRoute) {
      redirectUser(ctx, "/register");
    }
  } else {
    try {
      // const user = response.data;
      // const isRoot = user.role === "root";
      // const isAdmin = user.role === "admin";

      console.log("4", ctx.pathname);

      const isAdmin = admin;
      const isNotPermitted = !isAdmin && ctx.pathname === "/admin/dashboards";
      if (isNotPermitted) {
        console.log("5");
        redirectUser(ctx, "/register");
      }
    } catch (error) {
      console.error("error getting user", error);
      redirectUser(ctx, "/register");
    }
  }

  return { props };
};

export default App;
