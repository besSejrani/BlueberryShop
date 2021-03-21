import React from "react";

import { Box, Breadcrumbs, Link, Button, Typography, Paper } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import {
  DataGrid,
  GridCellParams,
  GridToolbarContainer,
  GridToolbarExport,
  GridColumnsToolbarButton,
  GridFilterToolbarButton,
} from "@material-ui/data-grid";

//Icons
import DeleteIcon from "@material-ui/icons/Delete";

// ========================================================================================================

const Promotions = () => {
  const classes = useStyles();

  function CustomToolbar() {
    return (
      <>
        <GridToolbarContainer style={{ marginLeft: 10, height: 50 }}>
          <GridColumnsToolbarButton />
          <GridFilterToolbarButton />
          <GridToolbarExport />
          <Button size="small" startIcon={<DeleteIcon />}>
            Delete
          </Button>
        </GridToolbarContainer>
      </>
    );
  }

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
              Promotions
            </Typography>

            <Breadcrumbs aria-label="breadcrumb">
              <Link href="/">Administration</Link>
              <Link color="inherit" href="/components/breadcrumbs/" aria-current="page">
                Promotion
              </Link>
            </Breadcrumbs>
          </Box>

          <Button variant="contained" color="secondary">
            Create Promotion
          </Button>
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
              Toolbar: CustomToolbar,
            }}
            checkboxSelection
            autoHeight
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default Promotions;

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
