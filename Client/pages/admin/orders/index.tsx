import React from "react";

import { Box, Breadcrumbs, Link, Button, Typography, Paper } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { GridCellParams } from "@material-ui/data-grid";

// Components
import DataGrid from "@Components/DataGrid/DataGrid";
import DataGridInfoAction from "@Components/DataGrid/DataGridInfoAction/DataGridInfoAction";

// SSR
import withApollo from "@Apollo/ssr";

// Guard
import { withAuth } from "@Guard/withAuth";

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
        <DataGridInfoAction title="Orders" />

        <Paper style={{ borderRadius: 15 }}>
          <DataGrid rows={rows} columns={columns} />
        </Paper>
      </Box>
    </Box>
  );
};

export default withApollo({ ssr: true })(withAuth(Orders));

// ========================================================================================================

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  }),
);
