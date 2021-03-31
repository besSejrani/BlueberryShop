import React from "react";

// Material-UI
import { DataGrid } from "@material-ui/data-grid";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

// Components
import Toolbar from "@Components/DataGrid/ToolBar/Toolbar";

// ========================================================================================================

const Datagrid = ({ columns, rows }) => {
  const classes = useStyles();

  return (
    <>
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
        components={{
          Toolbar,
        }}
        checkboxSelection
        autoHeight
      />
    </>
  );
};

export default Datagrid;

// ========================================================================================================

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dataGrid: {
      border: "none",
      width: "100%",
      backgroundColor: "white",
      borderRadius: 15,
    },
  })
);
