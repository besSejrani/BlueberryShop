import React from "react";

// Material-UI
import { Box } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

// Apollo State
import withApollo from "../../../Apollo/ssr";

// ========================================================================================================

const index = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <h1>hello</h1>
      <h1>hello2</h1>
    </Box>
  );
};

export default withApollo({ ssr: true })(index);

// ========================================================================================================

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    },
  })
);
