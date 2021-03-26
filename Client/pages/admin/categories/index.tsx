import React, { useState } from "react";

// Next
import Link from "next/link";
import { useRouter } from "next/router";

// Material-UI
import { Box, Breadcrumbs, Link as MaterialLink, Button, IconButton, Paper, Typography } from "@material-ui/core";
import { DataGrid, GridCellParams } from "@material-ui/data-grid";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

//Icons
import DeleteIcon from "@material-ui/icons/Delete";
import ModifyIcon from "@material-ui/icons/Create";

// Components
import Toolbar from "@Components/DataGrid/ToolBar/Toolbar";

// Hook
import useToast from "@Hook/useToast";

//Apollo
import {
  GetCategoriesDocument,
  GetCategoriesQuery,
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
} from "@Graphql/index";

// Apollo State
import { ui } from "@Apollo/state/ui/index";

// SSR
import withApollo from "@Apollo/ssr";

// ========================================================================================================

const Categories = () => {
  const classes = useStyles();
  const router = useRouter();

  // GraphQL
  const { loading, data } = useGetCategoriesQuery();
  const [deleteCategoryMutation, { error }] = useDeleteCategoryMutation({ errorPolicy: "all" });

  // Error Handling
  if (error) {
    error?.graphQLErrors.map(({ message }) => useToast({ message, color: "#ff0000" }));
  }

  // Events

  const handleClickOpen = (params) => {
    ui({
      isConfirmationDialogOpen: {
        open: true,
        identifier: params.row.name,
        deleteResource: () => deleteCategory(params.row.id),
        handleClose: () => handleClose(),
      },
    });
  };

  const handleClose = () => {
    ui({ isConfirmationDialogOpen: { identifier: ui().isConfirmationDialogOpen.identifier, open: false } });
  };

  const deleteCategory = async (categoryId) => {
    await deleteCategoryMutation({
      variables: { categoryId },

      update(cache, { data }) {
        const { getCategories }: GetCategoriesQuery = cache.readQuery({
          query: GetCategoriesDocument,
        });

        const newCategory = getCategories.filter((product) => product._id !== data.deleteCategory);

        cache.writeQuery({
          query: GetCategoriesDocument,
          data: {
            getCategories: { newCategory },
          },
        });
      },
    });

    await handleClose();
  };

  if (loading) return <div>loading...</div>;

  const columns = [
    {
      field: "name",
      headerName: "Category Name",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.4,

      renderCell: (params: GridCellParams) => (
        <>
          <IconButton onClick={() => router.push(`/admin/products/${params.row.id}`)}>
            <ModifyIcon />
          </IconButton>

          <IconButton onClick={() => handleClickOpen(params)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const rows = data?.getCategories.map((product) => {
    return {
      id: product._id,
      name: product.name,
      actions: "",
    };
  });

  return (
    <Box className={classes.root}>
      <Box style={{ width: "100%" }}>
        <Box className={classes.header}>
          <Box>
            <Typography variant="h5" style={{ margin: "0px 0px 10px 0px" }}>
              Categories
            </Typography>

            <Breadcrumbs aria-label="breadcrumb">
              <MaterialLink href="/">Administration</MaterialLink>
              <MaterialLink color="inherit" aria-current="page">
                Categories
              </MaterialLink>
            </Breadcrumbs>
          </Box>

          <Link href="/admin/categories/create-category" passHref>
            <Button variant="contained" color="secondary">
              Create Category
            </Button>
          </Link>
        </Box>

        <Paper style={{ borderRadius: 15 }}>
          <DataGrid
            className={classes.dataGrid}
            rows={rows}
            rowHeight={80}
            rowsPerPageOptions={[5, 10, 20]}
            columns={columns.map((column) => ({
              ...column,
              disableClickEventBubbling: true,
            }))}
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

export default withApollo({ ssr: true })(Categories);

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
    dataGrid: {
      border: "none",
      width: "100%",
      backgroundColor: "white",
      borderRadius: 15,
    },
  })
);
