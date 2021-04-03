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

// Components
import Toast from "@Components/Toast/Toast";
import ConfirmationDialog from "@Components/ConfirmationDialog/ConfirmationDialog";

// Apollo State
import { useReactiveVar } from "@apollo/client";
import { user } from "../Apollo/state/user/index";

// ========================================================================================================

const Layout = ({ children }) => {
  const admin = useReactiveVar(user);

  return (
    <>
      {admin.role === "admin" ? (
        <>
          <AdminHeader />
          <div style={{ padding: "120px 20px 0px 260px" }}>{children}</div>
          <AdminSideBar />
          <ConfirmationDialog />
          <Toast />
        </>
      ) : (
        <>
          <Header />

          <SideDrawerNavigation />
          <SideDrawerCart />
          {children}

          <ConfirmationDialog />
          <Toast />
          <Footer />
        </>
      )}
    </>
  );
};

export default withTheme(Layout);

// =================================================================
