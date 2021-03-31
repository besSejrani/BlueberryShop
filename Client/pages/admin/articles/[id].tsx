import React, { useState } from "react";

// Next
import { useRouter } from "next/router";

// React-Hook-Form
import { useForm, Controller } from "react-hook-form";

// Material-UI
import {
  Button,
  Box,
  Card,
  Typography,
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
  FormControlLabel,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

// Components
import InputForm from "@Components/InputForm/InputForm";
import MarkdownPreview from "@Components/Blog/MarkdownPreview/MarkdownPreview";
import BackButton from "@Components/BackButon/BackButton";

// SSR
import withApollo from "@Apollo/ssr";
import { DateTimePicker } from "@material-ui/pickers";

// GraphQL
import { useGetArticleQuery, useUpdateArticleMutation } from "@Graphql/index";

// State Management
import { useReactiveVar } from "@apollo/client";
import { markdown } from "@Apollo/state/markdown/index";

// Guard
import { withAuth } from "@Guard/withAuth";

// ========================================================================================================

type FormValues = {
  articleTitle: string;
  productPrice: number;
  productDescription: string;
  articleSummary: number;
  articleCategory: string;
  productPromotion: boolean;
};

const UpdateArticleAdmin = () => {
  const classes = useStyles();
  const router = useRouter();
  const { query } = router;

  // Apollo State
  const content = useReactiveVar(markdown) as string;

  // GraphQL
  const { data } = useGetArticleQuery({ variables: { articleId: query.id as string } });
  const [updateArticle] = useUpdateArticleMutation();

  // State
  const [articleTitle, setArticleTitle] = useState(data?.getArticle.title);
  const [articleSummary, setArticleSummary] = useState<string>(data?.getArticle.summary);
  const [articlePublishedAt, setArticlePublishedAt] = useState(data?.getArticle.publishedAt);
  const [articleSlug, setArticleSlug] = useState<string>(data?.getArticle.slug);
  const [articleAuthor, setArticleAuthor] = useState<string>(data?.getArticle.author);
  const [articleCategory, setArticleCategory] = useState<string>(data?.getArticle.category);

  // Form
  const { register, errors, handleSubmit, control } = useForm<FormValues>({
    criteriaMode: "all",
  });

  // Events
  const handleChangeCategory = (event: React.ChangeEvent<{ value: unknown }>) => {
    setArticleCategory(event.target.value as string);
  };

  const onSubmit = async (form) => {
    console.log(form);

    await updateArticle({
      variables: {
        articleId: query.id as string,

        title: form.articleTitle,
        author: form.articleAuthor,
        summary: form.articleSummary,
        publishedAt: articlePublishedAt,
        slug: form.articleSlug,
        content,
        status: form.articleStatus,
        category: "bla",
      },
    });

    await router.push("/admin/articles");
  };

  return (
    <Box className={classes.root}>
      <MarkdownPreview content={data?.getArticle.content} />
      <Card className={classes.cardCreation}>
        <Box className={classes.content}>
          <BackButton />

          <Box>
            <Typography variant="h4" style={{ fontSize: "1.85rem" }}>
              Update Article
            </Typography>
          </Box>

          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <InputForm
              type="text"
              name="articleTitle"
              id="articleTitle"
              label="Title"
              inputRef={register({
                required: "This field is required",
                minLength: { value: 2, message: "The product name should contain minimum 2 characters" },
                maxLength: { value: 22, message: "The product name should contain maximum 22 characters" },
              })}
              value={articleTitle}
              onChange={setArticleTitle}
              errors={errors}
            />

            <InputForm
              type="text"
              name="articleSummary"
              id="articleSummary"
              label="Summary"
              inputRef={register({
                required: "This field is required",
                minLength: { value: 2, message: "The product name should contain minimum 2 characters" },
                maxLength: { value: 22, message: "The product name should contain maximum 22 characters" },
              })}
              value={articleSummary}
              onChange={setArticleSummary}
              errors={errors}
            />

            <Controller
              control={control}
              name="articlePublishedAt"
              as={
                <>
                  <DateTimePicker
                    clearable
                    value={articlePublishedAt}
                    label="Published At"
                    format="DD.MM.yyyy HH:mm"
                    disablePast
                    onChange={setArticlePublishedAt}
                  />
                </>
              }
            />

            <InputForm
              type="text"
              name="articleSlug"
              id="articleSlug"
              label="Slug"
              inputRef={register({
                required: "This field is required",
                minLength: { value: 2, message: "The product name should contain minimum 2 characters" },
                maxLength: { value: 22, message: "The product name should contain maximum 22 characters" },
              })}
              value={articleSlug}
              onChange={setArticleSlug}
              errors={errors}
            />

            <InputForm
              type="text"
              name="articleAuthor"
              id="articleAuthor"
              label="Author"
              inputRef={register({
                required: "This field is required",
                minLength: { value: 2, message: "The product name should contain minimum 2 characters" },
                maxLength: { value: 22, message: "The product name should contain maximum 22 characters" },
              })}
              value={articleAuthor}
              onChange={setArticleAuthor}
              errors={errors}
            />

            <FormControl style={{ margin: "5px 0px 20px 0px" }}>
              <InputLabel id="articleCategoryLabel">Category</InputLabel>

              <Controller
                control={control}
                name="articleCategory"
                as={
                  <Select
                    labelId="articleCategoryLabel"
                    id="articleCategory"
                    value={articleCategory}
                    onChange={handleChangeCategory}
                    className={classes.input}
                  >
                    {/* {data?.getCategories.map((category) => {
                      return <MenuItem value={category._id}>{category.name}</MenuItem>;
                    })} */}
                  </Select>
                }
              />
            </FormControl>

            <FormControl component="fieldset">
              <FormLabel component="legend">Status</FormLabel>
              <RadioGroup row aria-label="position" name="position" defaultValue="top">
                <FormControlLabel
                  control={
                    <Radio
                      checked={data?.getArticle.status === "DRAFT"}
                      color="secondary"
                      value="DRAFT"
                      name="articleStatus"
                      inputRef={register()}
                    />
                  }
                  label="Draft"
                  labelPlacement="end"
                />

                <FormControlLabel
                  control={
                    <Radio
                      checked={data?.getArticle.status === "PUBLISHED"}
                      color="secondary"
                      value="PUBLISHED"
                      name="articleStatus"
                      inputRef={register()}
                    />
                  }
                  label="Published"
                  labelPlacement="end"
                />

                <FormControlLabel
                  control={
                    <Radio
                      checked={data?.getArticle.status === "ARCHIVED"}
                      color="secondary"
                      value="ARCHIVED"
                      name="articleStatus"
                      inputRef={register()}
                    />
                  }
                  label="Archived"
                  labelPlacement="end"
                />
              </RadioGroup>
            </FormControl>

            <Box style={{ flexDirection: "row", marginTop: "25px" }}>
              <Button variant="contained" color="secondary" type="submit">
                Update Article
              </Button>
            </Box>
          </form>
        </Box>
      </Card>
    </Box>
  );
};
export default withApollo({ ssr: true })(withAuth(UpdateArticleAdmin));

// ========================================================================================================

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100vh",
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center",
    },

    card: {
      position: "relative",
      display: "flex",
      justifyContent: "space-between",
      width: "60%",
      height: 660,
      borderRadius: "10px",
      overflowY: "scroll",
      margin: "0px 20px",
    },

    cardCreation: {
      position: "relative",
      display: "flex",
      justifyContent: "space-between",
      width: "40%",
      height: 660,
      borderRadius: "10px",
      margin: "0px 20px",
    },

    content: {
      position: "sticky",
      flexDirection: "column",
      padding: "20px 20px",
      width: "100%",
    },

    form: {
      display: "flex",
      flexDirection: "column",
      margin: "45px 0px 0px 0px",
    },

    input: {
      background: "none",
      "& .MuiSelect-select:focus": {
        background: "none",
      },
    },
  })
);
