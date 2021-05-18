import React from "react";

// Material-UI
import { Container, Paper } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";

// Components
import MultiStep from "@Components/Form/MultiStep/MultiStep";

// SSR
import withApollo from "@Apollo/ssr";

// Guard
import { withAuth } from "@Guard/withAuth";

// ========================================================================================================

const CheckoutDone = () => {
  const classes = useStyles();

  return (
    <Container>
      <Paper elevation={3} className={classes.root}>
        <MultiStep first="Shipping" second="Payment" third="Done" />
      </Paper>
    </Container>
  );
};

export default withApollo({ ssr: true })(withAuth(CheckoutDone));

// =================================================================

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      borderRadius: 10,
      height: "100%",
    },
  }),
);
