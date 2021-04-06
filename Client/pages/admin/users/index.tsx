import React from "react";

// Next
import { useRouter } from "next/router";

// Material-UI
import { Box, Button, Paper } from "@material-ui/core";
import { GridCellParams } from "@material-ui/data-grid";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

// Components
import DataGrid from "@Components/DataGrid/DataGrid";
import DataGridInfoAction from "@Components/DataGrid/DataGridInfoAction/DataGridInfoAction";
import DataGridAction from "@Components/DataGrid/DataGridAction/DataGridAction";

// Hook
import useToast from "@Hook/useToast";

//Apollo
import { ui } from "@Apollo/state/ui/index";
import { useGetUsersQuery, useDeleteUserMutation, GetUsersDocument, GetUsersQuery } from "@Graphql/index";

// SSR
import withApollo from "@Apollo/ssr";

// Guard
import { withAuth } from "@Guard/withAuth";

// ========================================================================================================

const Users = () => {
  const classes = useStyles();

  const { loading, data } = useGetUsersQuery();
  const [deleteUserMutation, { error }] = useDeleteUserMutation({ errorPolicy: "all" });

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
        deleteResource: () => deleteUser(params.row.id),
        handleClose: () => handleClose(),
      },
    });
  };

  const handleClose = () => {
    ui({ isConfirmationDialogOpen: { identifier: ui().isConfirmationDialogOpen.identifier, open: false } });
  };
  const deleteUser = async (userId) => {
    await deleteUserMutation({
      variables: { userId },

      update(cache, { data }) {
        const { getUsers }: GetUsersQuery = cache.readQuery({
          query: GetUsersDocument,
        });

        const newUsers = getUsers.filter((user) => user._id !== data.deleteUser);

        cache.writeQuery({
          query: GetUsersDocument,
          data: {
            getUsers: { newUsers },
          },
        });
      },
    });

    await handleClose();
  };

  if (loading) return <div>loading...</div>;

  const columns = [
    {
      field: "username",
      headerName: "Username",
      flex: 1,
      renderCell: (params: GridCellParams) => {
        return (
          <>
            <img src="/images/unknown.png" width={50} />
            {params.value}
          </>
        );
      },
    },
    { field: "email", headerName: "Email", flex: 0.4 },
    {
      field: "confirmed",
      headerName: "Confirmed",
      flex: 0.4,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.4,
      renderCell: (params: GridCellParams) => {
        const role = params.row.role;

        switch (role) {
          case "user":
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
          case "admin":
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
        }
      },
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

  const rows = data?.getUsers.map((user) => {
    return {
      id: user._id,
      username: user.username,
      email: user.email,
      confirmed: user.confirmed,
      role: user.role,
      actions: "",
    };
  });

  return (
    <Box className={classes.root}>
      <Box style={{ width: "100%" }}>
        <DataGridInfoAction title="Users" />

        <Paper style={{ borderRadius: 15 }}>
          <DataGrid columns={columns} rows={rows} />
        </Paper>
      </Box>
    </Box>
  );
};

export default withApollo({ ssr: true })(withAuth(Users));

// ========================================================================================================

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  })
);
