import React, { useState } from "react";

// Material-UI
import {
  Box,
  Breadcrumbs,
  Link as MaterialLink,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Typography,
  Paper,
} from "@material-ui/core";
import {
  DataGrid,
  GridCellParams,
  GridToolbarContainer,
  GridToolbarExport,
  GridColumnsToolbarButton,
  GridFilterToolbarButton,
} from "@material-ui/data-grid";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

//Icons
import DeleteIcon from "@material-ui/icons/Delete";

// Hook
import useToast from "@Hook/useToast";

//Apollo
import {
  GetNewslettersDocument,
  GetNewslettersQuery,
  useGetNewslettersQuery,
  useDeleteFromNewsletterMutation,
} from "@Graphql/index";

// SSR
import withApollo from "@Apollo/ssr";

// ========================================================================================================

const Newsletters = () => {
  const classes = useStyles();

  // GraphQL
  const { loading, data } = useGetNewslettersQuery();
  const [deleteFromNewsletter, { error }] = useDeleteFromNewsletterMutation({ errorPolicy: "all" });

  if (error) {
    error?.graphQLErrors.map(({ message }) => useToast({ message, color: "#ff0000" }));
  }

  // State

  const [open, setOpen] = useState(false);
  const [newsletter, setNewsletter] = useState(null);

  // Events
  const handleClickOpen = (params) => {
    setOpen(true);
    setNewsletter(params);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  const deleteNewsletter = async (newsletterId) => {
    await deleteFromNewsletter({
      variables: { newsletterId },

      update(cache, { data }) {
        const { getNewsletters }: GetNewslettersQuery = cache.readQuery({
          query: GetNewslettersDocument,
        });

        const newNewsletters = getNewsletters.filter((newsletter) => newsletter._id !== data.deleteFromNewsletter);

        cache.writeQuery({
          query: GetNewslettersDocument,
          data: {
            getNewsletters: { newNewsletters },
          },
        });
      },
    });

    await handleClose();
  };

  if (loading) return <div>loading...</div>;

  const columns = [
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      renderCell: (params: GridCellParams) => (
        <>
          <img src="/static/images/unknownProduct.png" height={55} />
          {params.value}
        </>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.4,

      renderCell: (params: GridCellParams) => (
        <>
          <IconButton onClick={() => handleClickOpen(params)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const rows = data?.getNewsletters.map((newsletter) => {
    return {
      id: newsletter._id,
      email: newsletter.email,
      actions: "",
    };
  });

  return (
    <Box className={classes.root}>
      <Box style={{ width: "100%" }}>
        <Box className={classes.header}>
          <Box>
            <Typography variant="h5" style={{ margin: "0px 0px 10px 0px" }}>
              Newsletter
            </Typography>

            <Breadcrumbs aria-label="breadcrumb">
              <MaterialLink color="inherit" href="/">
                Administration
              </MaterialLink>
              <MaterialLink color="textPrimary" aria-current="page">
                Newsletter
              </MaterialLink>
            </Breadcrumbs>
          </Box>
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
            pageSize={10}
            // rowCount={count}
            components={{
              Toolbar: CustomToolbar,
            }}
            checkboxSelection
            autoHeight
          />
        </Paper>
        <div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{`Are you sure you want to delete the  ${newsletter?.row.email} ?`}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Yes, I want to delete this newsletter.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
              <Button onClick={() => deleteNewsletter(newsletter.row.id)} color="secondary" autoFocus>
                Delete Product
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Box>
    </Box>
  );
};

export default withApollo({ ssr: true })(Newsletters);

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
      margin: "0px 0px 50px 0px",
    },
    toolbarIcon: {
      fontSize: 20,
    },
    dataGrid: {
      border: "none",
      width: "100%",
      backgroundColor: "white",
      borderRadius: 15,
    },
  })
);
