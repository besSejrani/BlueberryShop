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
          <div style={{ padding: "120px 20px 0px 260px", backgroundColor: "rgb(244, 245, 247)",  }}>{children}</div>
          <AdminSideBar />
        </>
      ) : (
        <>
          <Header />

          <SideDrawerNavigation />
          <SideDrawerCart />
          {children}

          <Footer />
        </>
      )}
    </>
  );
};

export default withTheme(Layout);

// =================================================================
