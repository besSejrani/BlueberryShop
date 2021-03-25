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
  Checkbox,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

// Components
import InputForm from "@Components/InputForm/InputForm";


// Date Picker
import { DatePicker, TimePicker, DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

// Icons
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

// Apollo
import { useCreateProductMutation, GetProductsDocument, GetProductsQuery, useGetCategoriesQuery } from "@Graphql/index";

// SSR
import withApollo from "@Apollo/ssr";

// ========================================================================================================

type FormValues = {
  productName: string;
  productPrice: number;
  productDescription: string;
  productStock: number;
  productCategory: string;
  productPromotion: boolean;
};

const CreateProductAdmin = () => {
  const classes = useStyles();

  // GraphQL
  const [createProduct] = useCreateProductMutation();
  const { data } = useGetCategoriesQuery();

  // State
  const [selectedDate, handleDateChange] = useState(new Date());
  const [promotionName, setPromotionName] = useState("");
  const [productPromotion, setProductPromotion] = useState<number>();
  const [productCategory, setProductCategory] = useState<string>("");

  const router = useRouter();

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
    // await createProduct({
    //   variables: {
    //     name: form.productName,
    //     price: form.productPrice,
    //     description: form.productDescription,
    //     stock: form.productStock,
    //     category: form.productCategory,
    //     promotion: form.productPromotion,
    //     status: form.productStatus,
    //   },
    //   update(cache, { data }) {
    //     const newProduct = data?.createProduct;

    //     const products: GetProductsQuery = cache.readQuery({
    //       query: GetProductsDocument,
    //     });

    //     cache.writeQuery({
    //       query: GetProductsDocument,
    //       data: {
    //         getProducts: [...products?.getProducts.products, newProduct],
    //       },
    //     });
    //   },
    // });

    await router.push("/admin/promotions");
  };

  console.log(selectedDate);

  let today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;

  return (
    <Box className={classes.root}>
      <Card elevation={1} className={classes.card}>

          
        <Box className={classes.content}>
      <Box className={classes.backButton} onClick={()=>router.back()}>
            <IconButton edge="start">
              <ArrowBackIcon color="primary" />
            </IconButton>
            <Typography variant="body1">Go Back</Typography>
          </Box>
          <Box>
            <Typography variant="h4" style={{ fontSize: "1.85rem" }}>
              Create a product sale
            </Typography>
          </Box>

          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <InputForm
              type="text"
              name="promotionName"
              id="promotionName"
              label="Promotion Name"
              inputRef={register({
                required: "This field is required",
                minLength: { value: 2, message: "The product name should contain minimum 2 characters" },
                maxLength: { value: 22, message: "The product name should contain maximum 22 characters" },
              })}
              style={{margin: 0}}
              value={promotionName}
              onChange={setPromotionName}
              errors={errors}
            />

            <DateTimePicker value={selectedDate} minDate={today} label="Start Date" onChange={handleDateChange} />

            <DateTimePicker
              value={selectedDate}
              minDate={today} 
              maxDate={new Date("2022-04-25")}
              label="End Date"
              onChange={handleDateChange}
            />

            <FormControl >
              <InputLabel id="productPromotionLabel">Product</InputLabel>

              <Controller
                control={control}
                name="productPromotion"
                as={
                  <Select
                    labelId="productPromotionLabel"
                    id="productPromotion"
                    value={productPromotion}
                    onChange={handleChangeCategory}
                    className={classes.input}
                  >
                    {data?.getCategories.map((category) => {
                      return <MenuItem value={category._id}>{category.name}</MenuItem>;
                    })}
                  </Select>
                }
              />
            </FormControl>

            {/* <FormControl >
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
                    {data?.getCategories.map((category) => {
                      return <MenuItem value={category._id}>{category.name}</MenuItem>;
                    })}
                  </Select>
                }
              />
            </FormControl> */}



            <Box style={{ flexDirection: "row", marginTop: "25px" }}>
              <Button variant="contained" color="secondary" type="submit">
                Create Sale
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
      justifyContent: "center",
      alignItems:"center",
      flexDirection:"column",
      width: "700px",
      height: 550,
      borderRadius: "10px",
      padding: "30px 40px",
    },
    
    content: {
      flexDirection: "column",
      width: "100%",
    },

    backButton: {
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      width: "120px",
      padding: "0px 0px 15px 0px"
    },
    
    form: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-evenly",
      height:"400px",
      margin: "30px 0px 0px 0px",
    },

    input: {
      background: "none",
      "& .MuiSelect-select:focus": {
        background: "none",
      },
    },
  })
);
