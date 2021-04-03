import React from "react";

//Next
import { useRouter } from "next/router";

// Material-UI
import { Box, Button, Paper } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { GridCellParams } from "@material-ui/data-grid";

// Hooks
import useToast from "@Hook/useToast";

// Components
import DataGrid from "Components/DataGrid/DataGrid";
import DataGridInfoAction from "@Components/DataGrid/DataGridInfoAction/DataGridInfoAction";
import DataGridAction from "@Components/DataGrid/DataGridAction/DataGridAction";
import DataGridLinkButton from "@Components/DataGrid/DataGridLinkButton/DataGridLinkButton";

// Moment
import moment from "moment";

// Apollo
import { ui } from "@Apollo/state/ui/index";

// GraphQl
import { useGetArticlesQuery, useDeleteArticleMutation, GetArticlesQuery, GetArticlesDocument } from "@Graphql/index";

// SSR
import withApollo from "@Apollo/ssr";

// Guard
import { withAuth } from "@Guard/withAuth";

// ========================================================================================================

const Articles = () => {
  const classes = useStyles();
  const router = useRouter();

  const { data, loading } = useGetArticlesQuery();
  const [deleteArticleMutation, { error }] = useDeleteArticleMutation({ errorPolicy: "all" });

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
        deleteResource: () => deleteArticle(params.row.id),
        handleClose: () => handleClose(),
      },
    });
  };

  const handleClose = () => {
    ui({ isConfirmationDialogOpen: { identifier: ui().isConfirmationDialogOpen.identifier, open: false } });
  };

  const deleteArticle = async (articleId) => {
    await deleteArticleMutation({
      variables: { articleId },
      update(cache, { data }) {
        const { getArticles }: GetArticlesQuery = cache.readQuery({
          query: GetArticlesDocument,
        });

        const newArticles = getArticles.filter((product) => product._id !== data.deleteArticle);

        cache.writeQuery({
          query: GetArticlesDocument,
          data: {
            getArticles: { newArticles },
          },
        });
      },
    });

    await handleClose();
  };

  const columns = [
    { field: "title", headerName: "Title", flex: 1 },
    {
      field: "name",
      headerName: "Link",
      flex: 0.4,
      renderCell: (params: GridCellParams) => {
        return <DataGridLinkButton path={`/blog/${params.row.link}`} text="Link" />;
      },
    },

    {
      field: "author",
      headerName: "Author",
      flex: 0.4,
    },
    {
      field: "category",
      headerName: "Category",
      flex: 0.4,
    },
    {
      field: "publishedAt",
      headerName: "Published At",
      flex: 0.4,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 0.4,
    },
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
                style={{ borderRadius: 20, color: "#2196f3", borderColor: "#2196f3" }}
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
        <DataGridAction path={`/admin/articles/${params.row.id}`} handleClickOpen={() => handleClickOpen(params)} />
      ),
    },
  ];

  const rows = data?.getArticles.map((product) => {
    return {
      id: product._id,
      title: product.title,
      name: product.title,
      link: product.slug,
      author: product.author,
      category: product.categories.map((category) => category.name),
      publishedAt: moment(product.publishedAt).format("DD.MM.yyyy HH:mm"),
      createdAt: moment(product.createdAt).format("DD.MM.yyyy HH:mm"),
      status: product.status,
      actions: "",
    };
  });

  if (loading) return <div>loading...</div>;

  return (
    <Box className={classes.root}>
      <Box style={{ width: "100%" }}>
        <DataGridInfoAction action="Create Article" title="Articles" path="articles/create-article" />

        <Paper style={{ borderRadius: 15 }}>
          <DataGrid rows={rows} columns={columns} />
        </Paper>
      </Box>
    </Box>
  );
};

export default withApollo({ ssr: true })(Articles);

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
