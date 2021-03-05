import React from "react";

// Next
import Link from "next/link";
import { useRouter } from "next/router";

// Material-UI
import { Box, Breadcrumbs, Link as MaterialLink, Button, IconButton } from "@material-ui/core";
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
import { useGetProductsQuery, useDeleteProductMutation } from "../../../Graphql/index";

// ========================================================================================================

const index = () => {
  const classes = useStyles();

  const router = useRouter();

  const { loading, data } = useGetProductsQuery();
  const [deleteProductMutation] = useDeleteProductMutation();

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
    const { data } = await deleteProductMutation({ variables: { productId } });
  };

  if (loading) return <div>loading...</div>;

  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
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
      renderCell: (params: GridCellParams) => (
        <Button
          onClick={() => console.log(params)}
          variant="outlined"
          color="secondary"
          size="small"
          style={{ marginLeft: 16, borderRadius: 20 }}
        >
          {params.value}
        </Button>
      ),
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

          <IconButton onClick={() => deleteProduct(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const rows = data?.getProducts.map((product) => {
    return {
      id: product._id,
      name: product.name,
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
          <Breadcrumbs aria-label="breadcrumb">
            <MaterialLink color="inherit" href="/">
              Dashboard
            </MaterialLink>
            <MaterialLink color="inherit" href="/getting-started/installation/">
              Management
            </MaterialLink>
            <MaterialLink color="textPrimary" href="/components/breadcrumbs/" aria-current="page">
              Products
            </MaterialLink>
          </Breadcrumbs>

          <Link href="/admin/products/create-product" passHref>
            <Button variant="outlined">Create Product</Button>
          </Link>
        </Box>

        <div style={{ width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns.map((column) => ({
              ...column,
              disableClickEventBubbling: true,
            }))}
            pageSize={10}
            components={{
              Toolbar: CustomToolbar,
            }}
            checkboxSelection
            autoHeight
          />
        </div>
      </Box>
    </Box>
  );
};

export default index;

// ========================================================================================================

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "80vh",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      margin: "0px 0px 50px 0px",
    },
    toolbarIcon: {
      fontSize: 20,
    },
  })
);
