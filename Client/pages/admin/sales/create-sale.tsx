import React from "react";

// Material-UI
import { Box, Card } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

// Components
import Sales from "@Components/Sales/Sales";

// SSR
import withApollo from "@Apollo/ssr";

// ========================================================================================================

const CreateProductAdmin = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Card elevation={1} className={classes.card}>
        <Sales />
      </Card>
    </Box>
  );
};
export default withApollo({ ssr: true })(CreateProductAdmin);

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
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      width: "700px",
      height: 600,
      borderRadius: "10px",
      padding: "30px 40px",
    },
  })
);
