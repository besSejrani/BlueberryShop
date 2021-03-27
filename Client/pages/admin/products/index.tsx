import React from "react";

// Next
import Link from "next/link";
import { useRouter } from "next/router";

// Material-UI
import { Box, Breadcrumbs, Link as MaterialLink, Button, IconButton, Paper, Typography } from "@material-ui/core";
import { DataGrid, GridCellParams } from "@material-ui/data-grid";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

// Components
import Toolbar from "@Components/DataGrid/ToolBar/Toolbar";

//Icons
import DeleteIcon from "@material-ui/icons/Delete";
import ModifyIcon from "@material-ui/icons/Create";

// Hooks
import useToast from "@Hook/useToast";

//Apollo
import { ui } from "@Apollo/state/ui/index";
import { useGetProductsQuery, useDeleteProductMutation, GetProductsDocument, GetProductsQuery } from "@Graphql/index";

// SSR
import withApollo from "@Apollo/ssr";

// ========================================================================================================

const Products = () => {
  const classes = useStyles();
  const router = useRouter();

  // GraphQL
  const { loading, data } = useGetProductsQuery();
  const [deleteProductMutation, { error }] = useDeleteProductMutation({ errorPolicy: "all" });

  if (error) {
    error?.graphQLErrors.map(({ message }) => useToast({ message, color: "#ff0000" }));
  }

  // Events
  const handleClickOpen = (params) => {
    ui({
      isConfirmationDialogOpen: {
        open: true,
        identifier: params.row.name,
        deleteResource: () => deleteProduct(params.row.id),
        handleClose: () => handleClose(),
      },
    });
  };

  const handleClose = () => {
    ui({ isConfirmationDialogOpen: { identifier: ui().isConfirmationDialogOpen.identifier, open: false } });
  };

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
                style={{ borderRadius: 20, color: "green", borderColor: "green" }}
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
                style={{ borderRadius: 20, color: "#2196f3", borderColor: "#2196f3" }}
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

export default withApollo({ ssr: true })(Products);

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
