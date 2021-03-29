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
  IconButton,
} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

// Icons
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

// Components
import InputForm from "@Components/InputForm/InputForm";

// SSR
import withApollo from "@Apollo/ssr";
import { DateTimePicker } from "@material-ui/pickers";

// ========================================================================================================

type FormValues = {
  articleTitle: string;
  productPrice: number;
  productDescription: string;
  articleSummary: number;
  productCategory: string;
  productPromotion: boolean;
};

const CreateProductAdmin = () => {
  const classes = useStyles();
  const router = useRouter();

  // State
  const [articleTitle, setArticleTitle] = useState("");
  const [articleSummary, setArticleSummary] = useState<string>();
  const [articleContent, setArticleContent] = useState<string>();
  const [publishedAt, setPublishedAt] = useState(null);
  const [articleSlug, setArticleSlug] = useState<string>();
  const [articleAuthor, setArticleAuthor] = useState<string>();
  const [productCategory, setProductCategory] = useState<string>("");

  // Form
  const { register, errors, handleSubmit, control } = useForm<FormValues>({
    criteriaMode: "all",
  });

  // Events
  const handleChangeCategory = (event: React.ChangeEvent<{ value: unknown }>) => {
    setProductCategory(event.target.value as string);
  };

  const onSubmit = async (form) => {
    console.log(form);
  };

  return (
    <Box className={classes.root}>
      <Card elevation={1} className={classes.card}>
        <Box className={classes.preview}>
          <Box className={classes.backButton} onClick={() => router.back()}>
            <IconButton edge="start">
              <ArrowBackIcon color="primary" />
            </IconButton>
            <Typography variant="body1">Go Back</Typography>
          </Box>
          <InputForm
            type="text"
            name="articleContent"
            id="articleContent"
            label="Content"
            multiline
            variant="outlined"
            inputRef={register({
              required: "This field is required",
            })}
            value={articleContent}
            onChange={setArticleContent}
            errors={errors}
          />
        </Box>

        <Box className={classes.content}>
          <Box>
            <Typography variant="h4" style={{ fontSize: "1.85rem" }}>
              Create Article
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
              name="publishedAt"
              as={
                <>
                  <DateTimePicker
                    clearable
                    value={publishedAt}
                    label="Publsihed At"
                    format="DD.MM.yyyy HH:mm"
                    disablePast
                    onChange={setPublishedAt}
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
              <InputLabel id="productCategoryLabel">Category</InputLabel>

              <Controller
                control={control}
                name="productCategory"
                as={
                  <Select
                    labelId="productCategoryLabel"
                    id="productCategory"
                    value={productCategory}
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
                  control={<Radio color="secondary" value="DRAFT" name="productStatus" inputRef={register()} />}
                  label="Draft"
                  labelPlacement="end"
                />

                <FormControlLabel
                  control={<Radio color="secondary" value="PUBLISHED" name="productStatus" inputRef={register()} />}
                  label="Published"
                  labelPlacement="end"
                />

                <FormControlLabel
                  control={<Radio color="secondary" value="ARCHIVED" name="productStatus" inputRef={register()} />}
                  label="Archived"
                  labelPlacement="end"
                />
              </RadioGroup>
            </FormControl>

            <Box style={{ flexDirection: "row", marginTop: "25px" }}>
              <Button variant="contained" color="secondary" type="submit">
                Create Article
              </Button>
            </Box>
          </form>
        </Box>
      </Card>
    </Box>
  );
};
export default withApollo({ ssr: true })(CreateProductAdmin);

// ========================================================================================================

const useStyles = makeStyles((theme: Theme) =>
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
      justifyContent: "space-between",
      width: "1100px",
      height: 600,
      borderRadius: "10px",
      overflowY: "scroll",
    },

    backButton: {
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      width: "150px",
      padding: "0px 0px 15px 0px",
    },

    preview: {
      display: "flex",
      justifyContent: "start",
      flexDirection: "column",
      width: "50%",
      padding: "20px 30px",
    },

    content: {
      position: "sticky",
      flexDirection: "column",
      padding: "20px 20px",
      width: "50%",
      height: "100%",
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
