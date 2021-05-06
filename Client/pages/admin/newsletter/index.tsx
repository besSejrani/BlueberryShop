import React from "react";

// Material-UI
import { Box, Paper } from "@material-ui/core";
import { GridCellParams } from "@material-ui/data-grid";
import { makeStyles, createStyles } from "@material-ui/core/styles";

// Components
import DataGrid from "@Components/DataGrid/DataGrid";
import DataGridInfoAction from "@Components/DataGrid/DataGridInfoAction/DataGridInfoAction";
import DataGridAction from "@Components/DataGrid/DataGridAction/DataGridAction";

// Hook
import useToast from "@Hook/useToast";

// Apollo
import { ui } from "@Apollo/state/ui/index";
import {
  GetNewslettersDocument,
  GetNewslettersQuery,
  useGetNewslettersQuery,
  useDeleteFromNewsletterMutation,
} from "@Graphql/index";

// SSR
import withApollo from "@Apollo/ssr";

// Guard
import { withAuth } from "@Guard/withAuth";

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
      renderCell: ({ value }: GridCellParams) => (
        <>
          <img src="/images/unknownProduct.png" height={55} alt="" />
          {value}
        </>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.4,
      renderCell: (params: GridCellParams) => (
        <DataGridAction deleteOnly handleClickOpen={() => handleClickOpen(params)} />
      ),
    },
  ];

  const rows = data?.getNewsletters.map((newsletter) => ({
    id: newsletter._id,
    email: newsletter.email,
    actions: "",
  }));

  return (
    <Box className={classes.root}>
      <Box style={{ width: "100%" }}>
        <DataGridInfoAction title="Newsletter" />

        <Paper style={{ borderRadius: 15 }}>
          <DataGrid rows={rows} columns={columns} />
        </Paper>
      </Box>
    </Box>
  );
};

export default withApollo({ ssr: true })(withAuth(Newsletters));

// ========================================================================================================

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      justifyContent: "center",
      alignItems: "center",
    },
  }),
);
