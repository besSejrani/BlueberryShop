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
import { useGetUsersQuery, useDeleteUserMutation, GetUsersDocument, GetUsersQuery } from "../../../Graphql/index";

// SSR
import withApollo from "../../../Apollo/ssr";

// ========================================================================================================

const index = () => {
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
      renderCell: (params: GridCellParams) => (
        <>
          <img src="/static/images/unknown.png" width={50} />
          {params.value}
        </>
      ),
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
          <Breadcrumbs aria-label="breadcrumb">
            <MaterialLink color="inherit" href="/">
              Administration
            </MaterialLink>
            <MaterialLink color="inherit" href="/getting-started/installation/">
              Management
            </MaterialLink>
            <MaterialLink color="textPrimary" href="/components/breadcrumbs/" aria-current="page">
              Users
            </MaterialLink>
          </Breadcrumbs>
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

export default withApollo({ssr:true})(index)

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
