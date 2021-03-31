import React, { useState } from "react";

// Next
import Image from "next/image";

// Material-UI
import { Box, Breadcrumbs, Link as MaterialLink, Button, Typography, Paper } from "@material-ui/core";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

// Guard
import { withAuth } from "@Guard/withAuth";

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

        <Paper className={classes.dataGroup}>
          <Box className={classes.data}>
            <Typography variant="h5">Sales</Typography>
          </Box>
          <Box className={classes.data} style={{ borderLeft: "1px solid #d4d4d4", borderRight: "1px solid #d4d4d4" }}>
            <Typography variant="h5">Cost</Typography>
          </Box>
          <Box className={classes.data}>
            <Typography variant="h5">Profit</Typography>
          </Box>
        </Paper>

        <Box className={classes.chartGroup}>
          <Paper className={classes.chartLeft}>
            <Box className={classes.chart}>
              <Box style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
                <Typography variant="h6" style={{ margin: 20 }}>
                  Sales revenue
                </Typography>
                <Image height={400} width={1000} src={`/images/chart1.png`} />
              </Box>
            </Box>
          </Paper>
          <Paper className={classes.chartRight}>
            <Box className={classes.chart}>
              <Box style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
                <Typography variant="h6" style={{ margin: 20 }}>
                  Cost Breakdown
                </Typography>
                <Image height={400} width={600} src={`/images/chart2.png`} />
              </Box>
            </Box>
          </Paper>
        </Box>

        <Box className={classes.chartGroup}>
          <Paper className={classes.chartLeft}>
            <Box className={classes.chart}>
              <Box style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
                <Typography variant="h6" style={{ margin: 20 }}>
                  Sales By Continent
                </Typography>
                <Image height={500} width={1000} src={`/images/chart3.png`} />
              </Box>
            </Box>
          </Paper>
          <Paper className={classes.chartRight}>
            <Box className={classes.chart}>
              <Box style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
                <Typography variant="h5" style={{ margin: 20 }}>
                  Incremental Sales
                </Typography>
                <Image height={500} width={600} src={`/images/chart4.png`} />
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default withApollo({ ssr: true })(withAuth(Dashboard));

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

    dataGroup: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      margin: "20px 0px",
      borderRadius: 20,
    },

    data: {
      display: "flex",
      width: "100%",
      height: "100px",
      justifyContent: "center",
      alignItems: "center",
    },

    chartGroup: {
      display: "grid",
      gridTemplateColumns: "3fr 2fr",
      rowGap: 20,
      columnGap: 20,
      margin: "20px 0px",
    },

    chartLeft: {
      height: 600,
      borderRadius: 20,
    },

    chartRight: {
      height: 600,
      borderRadius: 20,
    },

    chart: {
      display: "flex",
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
  })
);
