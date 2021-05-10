import React from "react";

// Next
import Link from "next/link";
import Router from "next/router";
import Image from "next/image";

// Material-UI
import { AppBar, Toolbar, Typography, Box, Button, IconButton, Hidden, Badge } from "@material-ui/core";
import { makeStyles, createStyles, Theme, withStyles } from "@material-ui/core/styles";

// Icons
import PersonIcon from "@material-ui/icons/Person";
import CartIcon from "@material-ui/icons/ShoppingCart";
import SearchIcon from "@material-ui/icons/Search";

// GraphQL
import { LogoutDocument } from "@Graphql/index";

// Apollo
import { apolloClient } from "@Apollo/ssr";

// Apollo State
import { useReactiveVar } from "@apollo/client";
import { user } from "@Apollo/state/user/index";
import { ui } from "@Apollo/state/ui/index";

// ========================================================================================================

const AdminHeader = () => {
  const classes = useStyles();

  const data = useReactiveVar(user);

  const changeCart = () => {
    ui({ ...ui(), isCartOpen: true });
  };

  const Logout = async () => {
    // Delete Cookie
    apolloClient.mutate({
      mutation: LogoutDocument,
    });

    // Delete Token
    localStorage.removeItem("token");

    // Redirect
    Router.replace("/");

    // Reset State
    user({
      _id: "",
      username: "",
      role: "",
    });
  };

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/">
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <Image width={60} height={40} src="/raspberry.svg" alt="Raspberry Pi Logo" />
              <Typography variant="h6" className={classes.title}>
                BlueberryShop
              </Typography>
            </Box>
          </Link>

          <Hidden smDown>
            <Link href="/products">
              <Typography variant="body1" className={classes.link}>
                products
              </Typography>
            </Link>
            <Link href="/blog">
              <Typography variant="body1" className={classes.link}>
                Blog
              </Typography>
            </Link>
          </Hidden>
        </Box>

        <Box className={classes.user}>
          <IconButton color="inherit">
            <SearchIcon className="nav-icon" />
          </IconButton>

          <IconButton color="inherit" onClick={changeCart}>
            <StyledBadge
              // badgeContent={selectProducts}
              color="secondary"
              overlap="circle"
            >
              <CartIcon className="nav-icon" />
            </StyledBadge>
          </IconButton>

          <Link href="/account">
            {data.profileImageUrl ? (
              <img src={data.profileImageUrl} className={classes.profileImage} alt="" />
            ) : (
              <IconButton>
                <PersonIcon
                  style={{
                    color: "white",
                    borderRadius: 90,
                    fontSize: "25px",
                    backgroundColor: "grey",
                    padding: "3px",
                  }}
                />
              </IconButton>
            )}
          </Link>

          <Button style={{ color: "white" }} onClick={Logout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AdminHeader;

// ========================================================================================================

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    user: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      flexGrow: 1,
      textDecoration: "none",
      color: "white",
      marginRight: "20px",
    },
    link: {
      cursor: "pointer",
      marginLeft: "15px",
      fontWeight: 500,
      textTransform: "capitalize",
    },

    profileImage: {
      width: 30,
      height: 30,
      borderRadius: 90,
      cursor: "pointer",
      marginLeft: "0.5rem",
    },
  }),
);

// =================================================================

const StyledBadge = withStyles(() =>
  createStyles({
    badge: {
      right: 0,
      width: 20,
      height: 18,
      padding: "0px 11px",
    },
  }),
)(Badge);
