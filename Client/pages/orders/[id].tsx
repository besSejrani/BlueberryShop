import React from "react";

// Next
import { useRouter } from "next/router";

// Material-Ui
import { Container, Box, Card, Button, Divider, Typography } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

// SSR
import withApollo from "@Apollo/ssr";

// HOC
import { withAuth } from "@Guard/withAuth";

// ========================================================================================================

const OrderDetails = () => {
  const classes = useStyles();

  // Router
  const router = useRouter();

  return (
    <Container>
      <Box>hello</Box>
      <Box>hello</Box>
    </Container>
  );
};

export default withApollo({ ssr: false })(withAuth(OrderDetails));

// ========================================================================================================

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
  }),
);
