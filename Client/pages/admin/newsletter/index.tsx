import React, { useState } from "react";

// Material-UI
import { Box, Breadcrumbs, Link as MaterialLink, IconButton, Typography, Paper } from "@material-ui/core";
import { DataGrid, GridCellParams } from "@material-ui/data-grid";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

//Icons
import DeleteIcon from "@material-ui/icons/Delete";

// Components
import Toolbar from "@Components/DataGrid/ToolBar/Toolbar";

// Hook
import useToast from "@Hook/useToast";

//Apollo
import { ui } from "@Apollo/state/ui/index";
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

  // Error Hanlding
  if (error) {
    error?.graphQLErrors.map(({ message }) => useToast({ message, color: "#ff0000" }));
  }

  // Events
  const handleClickOpen = (params) => {
    ui({
      isConfirmationDialogOpen: {
        open: true,
        identifier: params.row.email,
        deleteResource: () => deleteNewsletter(params.row.id),
        handleClose: () => handleClose(),
      },
    });
  };

  const handleClose = () => {
    ui({ isConfirmationDialogOpen: { identifier: ui().isConfirmationDialogOpen.identifier, open: false } });
  };

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
          <IconButton edge="start" onClick={() => handleClickOpen(params)}>
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

    dataGrid: {
      border: "none",
      width: "100%",
      backgroundColor: "white",
      borderRadius: 15,
    },
  })
);
