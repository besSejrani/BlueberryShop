import React from "react";

//Next
import Link from "next/link";
import Router from "next/router";
import Image from "next/image";

// Material-UI
import { AppBar, Toolbar, Typography, Box, Button, IconButton, Hidden } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

// Icons
import PersonIcon from "@material-ui/icons/Person";

// Apollo State
import { user } from "../../Apollo/state/user/index";

// ========================================================================================================

const AdminHeader = () => {
  const classes = useStyles();

  const deleteJwtToken = () => {
    localStorage.removeItem("token");

    user({
      _id: "",
      username: "",
      role: "",
    });

    Router.replace("/");
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
              <Image width={60} height={40} src={"/raspberry.svg"} alt="Raspberry Pi Logo" />
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
          <Typography variant="body2">hi {user().username}</Typography>
          <Link href={`/account`}>
            <IconButton>
              <PersonIcon
                style={{ color: "white", borderRadius: 90, fontSize: "25px", backgroundColor: "grey", padding: "3px" }}
              />
            </IconButton>
          </Link>
          <Button style={{ color: "white" }} onClick={deleteJwtToken}>
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
  })
);
