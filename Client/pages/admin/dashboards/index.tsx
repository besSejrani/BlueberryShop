import React, { useState } from "react";

// Next

// Material-UI
import { Box, Breadcrumbs, Link as MaterialLink, Button, Typography } from "@material-ui/core";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

//Icons

//Apollo

// SSR
import withApollo from "@Apollo/ssr";

// ========================================================================================================

const Dashboard = () => {
  const classes = useStyles();

  // State
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState(null);

  // Events
  const handleClickOpen = (params) => {
    setOpen(true);

    setProduct(params);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box className={classes.root}>
      <Box style={{ width: "100%" }}>
        <Box className={classes.header}>
          <Box>
            <Typography variant="h5" style={{ margin: "0px 0px 10px 0px" }}>
              Dashboard
            </Typography>

            <Breadcrumbs aria-label="breadcrumb">
              <MaterialLink href="/">Administration</MaterialLink>
              <MaterialLink color="inherit" aria-current="page">
                Dashboard
              </MaterialLink>
            </Breadcrumbs>
          </Box>

          <Box>
            <Button variant="outlined" color="secondary" style={{ marginRight: 10 }}>
              Export
            </Button>

            <Button variant="contained" color="secondary">
              Last month
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default withApollo({ ssr: true })(Dashboard);

// ========================================================================================================

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      justifyContent: "center",
      alignItems: "center",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      margin: "0px 0px 50px 0px",
    },
  })
);
