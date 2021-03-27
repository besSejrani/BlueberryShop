import React from "react";

// Material-UI
import { Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@material-ui/core";

// State
import { useReactiveVar } from "@apollo/client";
import { ui } from "@Apollo/state/ui/index";

// ========================================================================================================

const ConfirmationDialog = () => {
  const isConfirmationDialogOpen = useReactiveVar(ui);

  return (
    <Box>
      <Dialog
        open={isConfirmationDialogOpen.isConfirmationDialogOpen?.open}
        onClose={() => isConfirmationDialogOpen.isConfirmationDialogOpen?.handleClose() as any}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{`Are you sure you want to delete
         ${isConfirmationDialogOpen.isConfirmationDialogOpen?.identifier} ?`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">Yes, I want to delete this product.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => isConfirmationDialogOpen.isConfirmationDialogOpen.handleClose() as any}
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => isConfirmationDialogOpen.isConfirmationDialogOpen.deleteResource() as any}
            color="secondary"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ConfirmationDialog;

// ========================================================================================================
