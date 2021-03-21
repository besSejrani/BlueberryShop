import React from "react";

// Next
import Link from "next/link";
import { useRouter } from "next/router";

// Material-UI
import { Box, Breadcrumbs, Link as MaterialLink, Button, IconButton, Typography, Paper } from "@material-ui/core";
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
import { useGetUsersQuery, useDeleteUserMutation, GetUsersDocument, GetUsersQuery } from "@Graphql/index";

// SSR
import withApollo from "@Apollo/ssr";

// ========================================================================================================

const Users = () => {
  const classes = useStyles();

  const router = useRouter();

  const { loading, data } = useGetUsersQuery();
  const [deleteUserMutation] = useDeleteUserMutation();

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

  const deleteUser = async (userId) => {
    const { data } = await deleteUserMutation({
      variables: { userId },

      update(cache, { data }) {
        const { getUsers }: GetUsersQuery = cache.readQuery({
          query: GetUsersDocument,
        });

        const newUsers = getUsers.filter((user) => user._id !== data.deleteUser);

        debugger;

        cache.writeQuery({
          query: GetUsersDocument,
          data: {
            getUsers: { newUsers },
          },
        });
      },
    });
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
            <img src="/static/images/unknown.png" width={50} />
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
        <>
          <IconButton onClick={() => router.push(`/admin/users/${params.row.id}`)}>
            <ModifyIcon />
          </IconButton>

          <IconButton onClick={() => deleteUser(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </>
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
        <Box className={classes.header}>
          <Box>
            <Typography variant="h5" style={{ margin: "0px 0px 10px 0px" }}>
              Users
            </Typography>

            <Breadcrumbs aria-label="breadcrumb">
              <MaterialLink href="/">Administration</MaterialLink>
              <MaterialLink color="inherit" href="/components/breadcrumbs/" aria-current="page">
                Users
              </MaterialLink>
            </Breadcrumbs>
          </Box>

          <Link href="/admin/users/create-user" passHref>
            <Button variant="contained" color="secondary">
              Create User
            </Button>
          </Link>
        </Box>

        <Paper style={{ borderRadius: 15 }}>
          <DataGrid
            className={classes.dataGrid}
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
        </Paper>
      </Box>
    </Box>
  );
};

export default withApollo({ ssr: true })(Users);

// ========================================================================================================

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
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
