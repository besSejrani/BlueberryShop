import React, { useState, useEffect } from "react";

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
import InputForm from "@Components/Form/InputForm/InputForm";
import MarkdownPreview from "@Components/Blog/MarkdownPreview/MarkdownPreview";
import MarkdownInput from "@Components/Blog/MarkdownInput/MarkdownInput";
import BackButton from "@Components/BackButon/BackButton";

// SSR
import withApollo from "@Apollo/ssr";
import { DateTimePicker } from "@material-ui/pickers";

// GraphQL
import { useGetArticleQuery, useUpdateArticleMutation, useGetArticleCategoriesQuery } from "@Graphql/index";

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
  const content = useReactiveVar(markdown) as any;

  // GraphQL
  const { data } = useGetArticleQuery({ variables: { articleId: query.id as string } });
  const { data: categories } = useGetArticleCategoriesQuery();
  const [updateArticle] = useUpdateArticleMutation();

  // State
  const [articleTitle, setArticleTitle] = useState("");
  const [articleSummary, setArticleSummary] = useState<string>("");
  const [articlePublishedAt, setArticlePublishedAt] = useState();
  const [articleSlug, setArticleSlug] = useState<string>("");
  const [articleAuthor, setArticleAuthor] = useState<string>("");
  const [articleCategory, setArticleCategory] = useState<string>("");
  const [articleStatus, setArticleStatus] = useState<string>("");

  useEffect(() => {
    setArticleTitle(data?.getArticle.title);
    setArticleSummary(data?.getArticle.summary);
    setArticlePublishedAt(data?.getArticle.publishedAt);
    setArticleSlug(data?.getArticle.slug);
    setArticleAuthor(data?.getArticle.author);
    setArticleStatus(data?.getArticle.status);
  }, [data]);

  // Form
  const { register, errors, handleSubmit, control } = useForm<FormValues>({
    criteriaMode: "all",
  });

  // Events
  const handleChangeCategory = (event: React.ChangeEvent<{ value: unknown }>) => {
    setArticleCategory(event.target.value as string);
  };

  const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setArticleStatus((event.target as HTMLInputElement).value);
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
        categories: form.articleCategory,
      },
    });

    await router.push("/admin/articles");
  };

  return (
    <Box className={classes.root}>
      <MarkdownInput content={data?.getArticle?.content} />
      <MarkdownPreview />
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
                    {categories?.getArticleCategories.map((category) => {
                      return <MenuItem value={category._id}>{category.name}</MenuItem>;
                    })}
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
                      color="secondary"
                      checked={articleStatus === "DRAFT"}
                      value="DRAFT"
                      name="productStatus"
                      onChange={handleChangeRadio}
                      inputRef={register()}
                    />
                  }
                  label="Draft"
                  labelPlacement="end"
                />

                <FormControlLabel
                  control={
                    <Radio
                      color="secondary"
                      checked={articleStatus === "PUBLISHED"}
                      value="PUBLISHED"
                      name="productStatus"
                      onChange={handleChangeRadio}
                      inputRef={register()}
                    />
                  }
                  label="Published"
                  labelPlacement="end"
                />

                <FormControlLabel
                  control={
                    <Radio
                      color="secondary"
                      checked={articleStatus === "ARCHIVED"}
                      value="ARCHIVED"
                      name="productStatus"
                      onChange={handleChangeRadio}
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
      height: "100%",
      display: "grid",
      justifyContent: "space-evenly",
      alignItems: "center",
      gridTemplateColumns: "1fr 2fr 1fr",
      gridColumnGap: 20,
    },

    cardCreation: {
      position: "relative",
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      height: 660,
      borderRadius: "10px",
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
