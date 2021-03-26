import React, { useState } from "react";

// Material-UI
import { Box, Card, Tabs, Tab } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

// Components
import Signin from "@Components/Register/SignIn/SignIn";
import Signup from "@Components/Register/SignUp/SignUp";

// ========================================================================================================

const SigninSignup = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const [isSignIn, setIsSignIn] = useState(true);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const renderForm = () => {
    if (isSignIn) {
      return <Signin />;
    } else {
      return <Signup />;
    }
  };

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        {renderForm()}
        <Box className={classes.tabsContainer}>
          <Tabs
            className={classes.tabs}
            value={value}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
            aria-label="disabled tabs example"
          >
            <Tab label="Sign In" className={classes.tab} disabled={isSignIn} onClick={() => setIsSignIn(true)} />
            <Tab label="Sign Up" className={classes.tab} disabled={!isSignIn} onClick={() => setIsSignIn(false)} />
          </Tabs>
        </Box>
      </Card>
    </div>
  );
};

export default SigninSignup;

// ========================================================================================================

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-evenly",
      alignItems: "center",
    },
    card: {
      position: "relative",
      width: "1100px",
      height: 520,
      borderRadius: "10px",
    },
    tabsContainer: {
      position: "absolute",
      bottom: "0px",
      right: "0px",
      display: "flex",
      justifyContent: "flex-end",
    },
    tabs: {
      width: "400px",
      display: "flex",
      justifyContent: "space-between",
    },
    tab: {
      width: "50%",
    },
  })
);
