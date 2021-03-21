import React from "react";

// Public Layout
import Header from "./Header";
import Footer from "./Footer";
import SideDrawerNavigation from "./SideDrawerNavigation";
import SideDrawerCart from "./SideDrawerCart";

// Admin Layout
import AdminSideBar from "./admin/adminSideBar";
import AdminHeader from "./admin/adminHeader";

// Theme
import { withTheme } from "./Theme";

// React-Toastify
import Toast from "@Components/Toast/Toast";

// Apollo State
import { useReactiveVar } from "@apollo/client";
import { ui } from "../Apollo/state/ui";

// ========================================================================================================

const Layout = ({ children }) => {
  const admin = useReactiveVar(ui);

  return (
    <>
      {admin.isAdmin ? (
        <>
          <AdminHeader />
          <div style={{ padding: "120px 20px 0px 260px" }}>{children}</div>
          <AdminSideBar />
          <Toast />
        </>
      ) : (
        <>
          <Header />

          <SideDrawerNavigation />
          <SideDrawerCart />
          {children}

          <Toast />
          <Footer />
        </>
      )}
    </>
  );
};

export default withTheme(Layout);

// =================================================================
