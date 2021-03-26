import React from "react";

// Material-UI
import { Button } from "@material-ui/core";
import {
  GridToolbarContainer,
  GridToolbarExport,
  GridColumnsToolbarButton,
  GridFilterToolbarButton,
} from "@material-ui/data-grid";

//Icons
import DeleteIcon from "@material-ui/icons/Delete";

// ========================================================================================================

const Toolbar = () => {
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
};

export default Toolbar;
