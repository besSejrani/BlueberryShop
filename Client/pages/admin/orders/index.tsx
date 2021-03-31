import React from "react";

import { Box, Breadcrumbs, Link, Button, Typography, Paper } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { GridCellParams } from "@material-ui/data-grid";

// Components
import DataGrid from "@Components/DataGrid/DataGrid";

// ========================================================================================================

const Orders = () => {
  const classes = useStyles();

  const columns = [
    { field: "number", headerName: "Number", flex: 1 },
    { field: "customer", headerName: "Customer", flex: 0.5 },
    { field: "method", headerName: "Method", flex: 0.5 },
    {
      field: "total",
      headerName: "Total",
      flex: 0.5,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.5,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
    },
  ];

  const rows = [];

  return (
    <Box className={classes.root}>
      <Box style={{ width: "100%" }}>
        <Box className={classes.header}>
          <Box>
            <Typography variant="h5" style={{ margin: "0px 0px 10px 0px" }}>
              Orders
            </Typography>

            <Breadcrumbs aria-label="breadcrumb">
              <Link href="/">Administration</Link>
              <Link color="inherit" href="/components/breadcrumbs/" aria-current="page">
                Orders
              </Link>
            </Breadcrumbs>
          </Box>

          <Button variant="contained" color="secondary">
            Create Order
          </Button>
        </Box>

        <Paper style={{ borderRadius: 15 }}>
          <DataGrid rows={rows} columns={columns} />
        </Paper>
      </Box>
    </Box>
  );
};

export default Orders;

// ========================================================================================================

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
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
