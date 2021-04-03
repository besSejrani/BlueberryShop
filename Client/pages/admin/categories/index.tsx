import React from "react";

// Next
import { useRouter } from "next/router";

// Material-UI
import { Box, IconButton, Paper } from "@material-ui/core";
import { GridCellParams } from "@material-ui/data-grid";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

//Icons
import DeleteIcon from "@material-ui/icons/Delete";
import ModifyIcon from "@material-ui/icons/Create";

// Components
import DataGrid from "@Components/DataGrid/DataGrid";
import DataGridInfoAction from "@Components/DataGrid/DataGridInfoAction/DataGridInfoAction";

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

// Guard
import { withAuth } from "@Guard/withAuth";

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
          <IconButton edge="start" onClick={() => router.push(`/admin/categories/${params.row.id}`)}>
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
        <DataGridInfoAction action="Create Category" title="Categories" path="categories/create-category" />

        <Paper style={{ borderRadius: 15 }}>
          <DataGrid rows={rows} columns={columns} />
        </Paper>
      </Box>
    </Box>
  );
};

export default withApollo({ ssr: true })(withAuth(Categories));

// ========================================================================================================

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      justifyContent: "center",
      alignItems: "center",
    },
  })
);
