import React from "react";

// Material-UI
import { Box, Typography } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";

// ========================================================================================================

const EmailProcessValidation = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="h2">Thank you for signing up !</Typography>
      <Typography variant="h5" style={{ margin: "40px" }}>
        Please, verify now your email.
      </Typography>
    </Box>
  );
};

export default EmailProcessValidation;

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
