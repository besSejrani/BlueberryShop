import React, { useState } from "react";

// Next
import Link from "next/link";
import { useRouter } from "next/router";

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
import ModifyIcon from "@material-ui/icons/Create";

//Apollo
import {
  GetCategoriesDocument,
  GetCategoriesQuery,
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
} from "../../../Graphql/index";

// SSR
import withApollo from "../../../Apollo/ssr";

// ========================================================================================================

const Categories = () => {
  const classes = useStyles();
  const router = useRouter();

  // GraphQL
  const { loading, data } = useGetCategoriesQuery();
  const [deleteCategoryMutation] = useDeleteCategoryMutation();

  // State
  // const [count, setCount] = useState(data?.getProducts.count);
  const [open, setOpen] = React.useState(false);
  const [product, setProduct] = React.useState(null);

  // Events
  const handleClickOpen = (params) => {
    setOpen(true);

    setProduct(params);
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
          <Breadcrumbs aria-label="breadcrumb">
            <MaterialLink color="inherit" href="/">
              Administration
            </MaterialLink>
            <MaterialLink color="textPrimary" aria-current="page">
              Categories
            </MaterialLink>
          </Breadcrumbs>

          <Link href="/admin/categories/create-category" passHref>
            <Button variant="outlined" color="secondary">
              Create Category
            </Button>
          </Link>
        </Box>

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
        <div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{`Are you sure you want to delete the category ${product?.row.name} ?`}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">Yes, I want to delete this product.</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
              <Button onClick={() => deleteCategory(product.row.id)} color="secondary" autoFocus>
                Delete Category
              </Button>
            </DialogActions>
          </Dialog>
        </div>
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
