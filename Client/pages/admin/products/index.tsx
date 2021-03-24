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
  Paper,
  Typography,
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
import { useGetProductsQuery, useDeleteProductMutation, GetProductsDocument, GetProductsQuery } from "@Graphql/index";

// SSR
import withApollo from "@Apollo/ssr";

// ========================================================================================================

const index = () => {
  const classes = useStyles();
  const router = useRouter();

  // GraphQL
  const { loading, data } = useGetProductsQuery();
  const [deleteProductMutation] = useDeleteProductMutation();

  // State
  const [count, setCount] = useState(data?.getProducts.count);
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

  const deleteProduct = async (productId) => {
    await deleteProductMutation({
      variables: { productId },

      update(cache, { data }) {
        const { getProducts }: GetProductsQuery = cache.readQuery({
          query: GetProductsDocument,
        });

        const newProducts = getProducts.products.filter((product) => product._id !== data.deleteProduct);

        cache.writeQuery({
          query: GetProductsDocument,
          data: {
            getProducts: { newProducts },
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
      headerName: "Name",
      flex: 1,

      renderCell: (params: any) => {
        const image = params.value[params.rowIndex].productImages[0];
        return (
          <>
            <img src={image || `/static/images/unknownProduct.png`} height={60} width={60} />
            {params.value[params.rowIndex].name}
          </>
        );
      },
    },
    { field: "category", headerName: "Category", flex: 0.4 },
    { field: "price", headerName: "Price", flex: 0.4 },
    {
      field: "stock",
      headerName: "Stock",
      flex: 0.4,
    },
    { field: "promotion", headerName: "Promotion", flex: 0.4 },
    {
      field: "status",
      headerName: "Status",
      flex: 0.4,
      renderCell: (params: GridCellParams) => {
        const status = params.row.status;

        switch (status) {
          case "DRAFT":
            return (
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                style={{ borderRadius: 20, borderColor: "#2196f3" }}
              >
                {params.value}
              </Button>
            );
          case "PUBLISHED":
            return (
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                style={{ borderRadius: 20, color: "green", borderColor: "green" }}
              >
                {params.value}
              </Button>
            );
          case "ARCHIVED":
            return (
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                style={{ borderRadius: 20, color: "#f57c00", borderColor: "#f57c00" }}
              >
                {params.value}
              </Button>
            );
        }
      },
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

  const rows = data?.getProducts.products.map((product) => {
    return {
      id: product._id,
      name: data?.getProducts.products.map((image) => image) || "",
      category: product.categories.map((category) => category.name),
      price: product.price,
      stock: product.stock,
      promotion: product.promotion,
      status: product.status,
      actions: "",
    };
  });

  return (
    <Box className={classes.root}>
      <Box style={{ width: "100%" }}>
        <Box className={classes.header}>
          <Box>
            <Typography variant="h5" style={{ margin: "0px 0px 10px 0px" }}>
              Products
            </Typography>

            <Breadcrumbs aria-label="breadcrumb">
              <MaterialLink href="/">Administration</MaterialLink>
              <MaterialLink color="inherit" aria-current="page">
                Products
              </MaterialLink>
            </Breadcrumbs>
          </Box>

          <Link href="/admin/products/create-product" passHref>
            <Button variant="contained" color="secondary">
              Create Product
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
            rowCount={count}
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
            <DialogTitle id="alert-dialog-title">{`Are you sure you want to delete this product`}</DialogTitle>

            <DialogContent>
              <DialogContentText id="alert-dialog-description">Yes, I want to delete this product.</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
              <Button onClick={() => deleteProduct(product.row.id)} color="secondary" autoFocus>
                Delete Product
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Box>
    </Box>
  );
};

export default withApollo({ ssr: true })(index);

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
