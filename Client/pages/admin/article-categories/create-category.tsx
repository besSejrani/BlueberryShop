import React, { useState } from "react";

// Next
import { useRouter } from "next/router";

// React-Hook-Form
import { useForm } from "react-hook-form";

// Material-UI
import { Button, Box, Card, Typography } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";

// Components
import InputForm from "@Components/Form/InputForm/InputForm";
import BackButton from "@Components/BackButon/BackButton";

// Apollo
import {
  GetArticleCategoriesDocument,
  GetArticleCategoriesQuery,
  useCreateArticleCategoryMutation,
} from "@Graphql/index";

// SSR
import withApollo from "@Apollo/ssr";

// Guard
import { withAuth } from "@Guard/withAuth";

// ========================================================================================================

type FormValues = {
  categoryName: string;
};

const CreateProductAdmin = () => {
  const classes = useStyles();

  const [categoryName, setCategoryName] = useState("");

  const router = useRouter();

  const { register, errors, handleSubmit } = useForm<FormValues>({
    criteriaMode: "all",
  });

  const [createCategory] = useCreateArticleCategoryMutation();

  const onSubmit = async (form) => {
    await createCategory({
      variables: {
        articleCategoryName: form.categoryName,
      },
      update(cache, { data }) {
        const newArticleCategory = data?.createArticleCategory;

        const { getArticleCategories }: GetArticleCategoriesQuery = cache.readQuery({
          query: GetArticleCategoriesDocument,
        });

        cache.writeQuery({
          query: GetArticleCategoriesDocument,
          data: {
            getArticleCategories: [...getArticleCategories, newArticleCategory],
          },
        });
      },
    });

    await router.push("/admin/article-categories");
  };

  return (
    <Box className={classes.root}>
      <Card elevation={1} className={classes.card}>
        <Box className={classes.content}>
          <BackButton />
          <Box>
            <Typography variant="h4" style={{ fontSize: "1.85rem" }}>
              Create Article Category
            </Typography>
          </Box>

          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <InputForm
              type="text"
              name="categoryName"
              id="categoryName"
              label="Name"
              inputRef={register({
                required: "This field is required",
              })}
              value={categoryName}
              onChange={setCategoryName}
              errors={errors}
            />

            <Box style={{ flexDirection: "row", marginTop: "25px" }}>
              <Button variant="contained" color="secondary" type="submit">
                Create Category
              </Button>
            </Box>
          </form>
        </Box>
      </Card>
    </Box>
  );
};
export default withApollo({ ssr: true })(withAuth(CreateProductAdmin));

// ========================================================================================================

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-evenly",
      alignItems: "center",
    },
    card: {
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "400px",
      height: 300,
      borderRadius: "10px",
    },

    content: {
      flexDirection: "column",
      padding: "30px",
      width: "100%",
    },

    form: {
      display: "flex",
      flexDirection: "column",
      margin: "45px 0px 0px 0px",
    },
  }),
);
