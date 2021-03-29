import React from "react";

//Next
import Link from "next/link";

// Material-UI
import { Box, Breadcrumbs, Link as MaterialLink, Button, Typography, Paper } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { DataGrid, GridCellParams } from "@material-ui/data-grid";

// Components
import Toolbar from "@Components/DataGrid/ToolBar/Toolbar";

// ========================================================================================================

const Articles = () => {
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
              Articles
            </Typography>

            <Breadcrumbs aria-label="breadcrumb">
              <MaterialLink href="/">Administration</MaterialLink>
              <MaterialLink color="inherit" href="/components/breadcrumbs/" aria-current="page">
                Articles
              </MaterialLink>
            </Breadcrumbs>
          </Box>

          <Link href="articles/create-article" passHref>
            <Button variant="contained" color="secondary">
              Create Article
            </Button>
          </Link>
        </Box>

        <Paper style={{ borderRadius: 15 }}>
          <DataGrid
            className={classes.dataGrid}
            rows={rows}
            rowsPerPageOptions={[5, 10, 20]}
            columns={columns.map((column) => ({
              ...column,
              disableClickEventBubbling: true,
            }))}
            rowHeight={80}
            pageSize={10}
            // rowCount={count}
            components={{
              Toolbar,
            }}
            checkboxSelection
            autoHeight
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default Articles;

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

    dataGrid: {
      border: "none",
      width: "100%",
      backgroundColor: "white",
      borderRadius: 15,
    },
  })
);
