import React from "react";

// Next
import Link from "next/link";
import { useRouter } from "next/router";

// Material-UI
import { Box, Button, IconButton, Paper } from "@material-ui/core";
import { GridCellParams } from "@material-ui/data-grid";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

// Components
import DataGrid from "@Components/DataGrid/DataGrid";
import DataGridInfoAction from "@Components/DataGrid/DataGridInfoAction/DataGridInfoAction";

//Icons
import DeleteIcon from "@material-ui/icons/Delete";
import ModifyIcon from "@material-ui/icons/Create";

// Hooks
import useToast from "@Hook/useToast";

// Moment
import moment from "moment";

//Apollo
import { ui } from "@Apollo/state/ui/index";
import { useGetSalesQuery, useDeleteSaleMutation, GetSalesDocument, GetSalesQuery } from "@Graphql/index";

// SSR
import withApollo from "@Apollo/ssr";

// Guard
import { withAuth } from "@Guard/withAuth";

// ========================================================================================================

const Products = () => {
  const classes = useStyles();
  const router = useRouter();

  // GraphQL
  const { data, loading } = useGetSalesQuery();
  const [deleteSaleMutation, { error }] = useDeleteSaleMutation({ errorPolicy: "all" });

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
        deleteResource: () => deleteSale(params.row.id),
        handleClose: () => handleClose(),
      },
    });
  };

  const handleClose = () => {
    ui({ isConfirmationDialogOpen: { identifier: ui().isConfirmationDialogOpen.identifier, open: false } });
  };

  const deleteSale = async (productId) => {
    await deleteSaleMutation({
      variables: { productId },

      update(cache, { data }) {
        const { getSales }: GetSalesQuery = cache.readQuery({
          query: GetSalesDocument,
        });

        const newSales = getSales.filter((product) => product._id !== data.deleteSale);

        cache.writeQuery({
          query: GetSalesDocument,
          data: {
            getSales: { newSales },
          },
        });
      },
    });

    await handleClose();
  };

  if (loading) return <div>loading...</div>;

  const columns = [
    { field: "name", headerName: "Sale Name", flex: 1 },
    {
      field: "discount",
      headerName: "Discount",
      flex: 0.4,
      renderCell: (params: GridCellParams) => {
        const discount = params.row.discount;

        if (discount <= 20) {
          return (
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              style={{ borderRadius: 20, color: "#2196f3", borderColor: "#2196f3" }}
            >
              {params.row.discount} %
            </Button>
          );
        }

        if (discount <= 40) {
          return (
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              style={{ borderRadius: 20, color: "#f57c00", borderColor: "#f57c00" }}
            >
              {params.row.discount} %
            </Button>
          );
        }

        if (discount > 40) {
          return (
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              style={{ borderRadius: 20, color: "#ff0000", borderColor: "#ff0000" }}
            >
              {params.row.discount} %
            </Button>
          );
        }
      },
    },
    { field: "start", headerName: "Start Date", flex: 0.4 },
    { field: "end", headerName: "End Date", flex: 0.4 },
    { field: "createdAt", headerName: "Created At", flex: 0.4 },

    {
      field: "actions",
      headerName: "Actions",
      flex: 0.4,
      renderCell: (params: GridCellParams) => (
        <>
          <IconButton edge="start" onClick={() => router.push(`/admin/sales/${params.row.id}`)}>
            <ModifyIcon />
          </IconButton>

          <IconButton onClick={() => handleClickOpen(params)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const rows = data?.getSales?.map((product) => {
    return {
      id: product._id,
      name: product.sale,
      start: moment(product.startDate).format("DD.MM.yyyy HH:mm"),
      end: moment(product.endDate).format("DD.MM.yyyy HH:mm"),
      createdAt: moment(product.createdAt).format("DD.MM.yyyy HH:mm"),
      discount: product.discount,
      actions: "",
    };
  });

  return (
    <Box className={classes.root}>
      <Box style={{ width: "100%" }}>
        <DataGridInfoAction title="Sales" action="Create Sale" path="sales/create-sale" />

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
