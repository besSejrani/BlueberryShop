import React from "react";

// Material-UI
import { Box, Typography } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
// ========================================================================================================

const PasswordConfirmation = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="h2">An email confirmation has been send to you !</Typography>
      <Typography variant="h5" style={{ margin: "40px" }}>
        Please, verify now your email.
      </Typography>
    </Box>
  );
};

export default PasswordConfirmation;

// ========================================================================================================

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  }),
);
