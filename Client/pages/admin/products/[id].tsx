import React, { useState } from "react";

//Next
import { useRouter } from "next/router";

// React-Hook-Form
import { useForm } from "react-hook-form";

// Material-UI
import {
  Button,
  Box,
  Card,
  Typography,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Checkbox,
} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

// Components
import InputForm from "../../../Components/InputForm/InputForm";
import UploadFile from "../../../Components/UploadFile/UploadFile";
import PreviewProduct from "../../../Components/PreviewProduct/PreviewProduct";

// Apollo
import { useUpdateProductMutation, useGetProductQuery } from "../../../Graphql/index";

// SSR
import withApollo from "../../../Apollo/ssr";

// ========================================================================================================

type FormValues = {
  productName: string;
  productPrice: number;
  productDescription: string;
  productStock: number;
};

const ModifyProductAdmin = () => {
  const classes = useStyles();

  // Form
  const { register, errors, handleSubmit } = useForm<FormValues>({
    criteriaMode: "all",
  });

  // Route
  const router = useRouter();
  const { query } = router;

  // Update Product
  const [updateProduct] = useUpdateProductMutation();

  // Get Product
  const { data, loading } = useGetProductQuery({
    variables: { productId: query.id as string },
  });

  // State
  const [productName, setProductName] = useState(data?.getProduct?.name);
  const [productPrice, setProductPrice] = useState<number>(data?.getProduct?.price);
  const [productDescription, setProductDescription] = useState(data?.getProduct?.description);
  const [productStock, setProductStock] = useState<number>(data?.getProduct?.stock);
  const [productPromotion, setProductPromotion] = useState<boolean>(data?.getProduct?.promotion);
  const [productStatus, setProductStatus] = useState<string>(data?.getProduct?.status);

  // Events
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductPromotion(!productPromotion);
  };

  const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductStatus((event.target as HTMLInputElement).value);
  };

  // Submit Form
  const onSubmit = async (form) => {
    await updateProduct({
      variables: {
        productId: query.id as string,
        name: form.productName,
        price: parseFloat(form.productPrice),
        description: form.productDescription,
        stock: parseInt(form.productStock),
        promotion: form.productPromotion,
        status: form.productStatus,
      },
    });

    await router.push("/admin/products");
  };

  // Fake Data
  const product = {
    id: 0,
    title: productName,
    price: productPrice,
    company: "Raspberry Foundation",
    description: productDescription,
    featured: false,
    options: [],
    imageUrl: "static/images/computeModule3+/1.webp",
    images: data?.getProduct?.productImages,
    stock: productStock,
    rating: 4,
    reviews: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
  };

  // Loader
  if (loading) return <h1>Loading ...</h1>;

  return (
    <Box className={classes.root}>
      <Card elevation={1} className={classes.card}>
        <Box className={classes.preview}>
          <PreviewProduct product={product} images={data?.getProduct?.productImages} router={query.id} />
        </Box>

        <Box className={classes.content}>
          <Box>
            <Typography variant="h4" style={{ fontSize: "1.85rem" }}>
              Update Product
            </Typography>
          </Box>

          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <UploadFile name="Update images" filesLimit={4} />
            </Box>

            <InputForm
              type="text"
              name="productName"
              id="productName"
              label="Name"
              inputRef={register({
                required: "This field is required",
                minLength: { value: 2, message: "The product name should contain minimum 2 characters" },
                maxLength: { value: 22, message: "The product name should contain maximum 22 characters" },
              })}
              value={productName}
              onChange={setProductName}
              errors={errors}
            />

            <InputForm
              type="number"
              name="productPrice"
              id="productPrice"
              label="Price"
              inputRef={register({
                required: "This field is required",
                maxLength: { value: 5, message: "The product price should contain maximum 5 digits" },
                min: { value: 0, message: "The product price can not be a negative number" },
              })}
              value={productPrice}
              onChange={setProductPrice}
              errors={errors}
            />

            <InputForm
              type="text"
              name="productDescription"
              id="productDescription"
              label="Description"
              multiline
              rowsMax={"4"}
              inputRef={register({
                required: "This field is required",
                minLength: { value: 20, message: "The product description should contain minimum 20 characters" },
                maxLength: { value: 250, message: "The product description should contain maximum 250 characters" },
              })}
              value={productDescription}
              onChange={setProductDescription}
              errors={errors}
            />

            <InputForm
              type="number"
              name="productStock"
              id="productStock"
              label="Stock"
              inputRef={register({
                required: "This field is required",
                maxLength: { value: 5, message: "The product stock should contain maximum 5 digits" },
                min: { value: 0, message: "The product stock an not be a negative number" },
              })}
              value={productStock}
              onChange={setProductStock}
              errors={errors}
            />

            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  inputRef={register()}
                  onChange={handleChange}
                  name="productPromotion"
                  id="productPromotion"
                  disableRipple
                  checked={productPromotion}
                />
              }
              label="Promotion"
            />

            <FormControl component="fieldset">
              <FormLabel component="legend">Status</FormLabel>
              <RadioGroup row aria-label="position" name="position" defaultValue="top">
                <FormControlLabel
                  control={
                    <Radio
                      color="secondary"
                      checked={productStatus === "DRAFT"}
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
                      checked={productStatus === "PUBLISHED"}
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
                      checked={productStatus === "ARCHIVED"}
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
                Update Product
              </Button>
            </Box>
          </form>
        </Box>
      </Card>
    </Box>
  );
};

export default withApollo({ ssr: true })(ModifyProductAdmin);

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
    },

    preview: {
      display: "flex",
      justifyContent: "center",
      width: "50%",
      padding: "20px 30px",
    },

    content: {
      flexDirection: "column",
      padding: "20px 20px",
      width: "50%",
    },

    form: {
      display: "flex",
      flexDirection: "column",
      margin: "45px 0px 0px 0px",
    },
  })
);
