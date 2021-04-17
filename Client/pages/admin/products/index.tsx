import React from "react";

// Material-UI
import { Box, Button, Paper } from "@material-ui/core";
import { GridCellParams } from "@material-ui/data-grid";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

// Components
import DataGrid from "@Components/DataGrid/DataGrid";
import DataGridInfoAction from "@Components/DataGrid/DataGridInfoAction/DataGridInfoAction";
import DataGridAction from "@Components/DataGrid/DataGridAction/DataGridAction";

// Hooks
import useToast from "@Hook/useToast";

// Apollo
import { ui } from "@Apollo/state/ui/index";
import { useGetProductsQuery, useDeleteProductMutation, GetProductsDocument, GetProductsQuery } from "@Graphql/index";

// SSR
import withApollo from "@Apollo/ssr";

// Guard
import { withAuth } from "@Guard/withAuth";

// ========================================================================================================

const Products = () => {
  const classes = useStyles();

  // GraphQL
  const { loading, data } = useGetProductsQuery();
  const [deleteProductMutation, { error }] = useDeleteProductMutation({ errorPolicy: "all" });

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
            <img src={image || `/images/unknownProduct.png`} height={60} width={60} />
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
        <DataGridAction path={`/admin/products/${params.row.id}`} handleClickOpen={() => handleClickOpen(params)} />
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
        <DataGridInfoAction title="Products" action="Create Product" path="products/create-product" />

        <Paper style={{ borderRadius: 15 }}>
          <DataGrid rows={rows} columns={columns} />
        </Paper>
      </Box>
    </Box>
  );
};

export default withApollo({ ssr: true })(withAuth(Products));

// ========================================================================================================

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      justifyContent: "center",
      alignItems: "center",
    },
  })
);
