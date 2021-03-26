import React, { useState } from "react";

// Next
import { useRouter } from "next/router";

// Material-UI
import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, Typography } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

// Icons
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

// Date Picker
import { DateTimePicker } from "@material-ui/pickers";

// Components
import InputForm from "@Components/InputForm/InputForm";

// React-Hook-Form
import { useForm, Controller } from "react-hook-form";

// Apollo
import { useGetProductsSaleQuery, useCreateSaleMutation } from "@Graphql/index";

// ========================================================================================================

type FormValues = {
  productName: string;
  productPrice: number;
  productDescription: string;
  productStock: number;
  productCategory: string;
  productSale: boolean;
};

const Product = () => {
  const classes = useStyles();
  const router = useRouter();

  // GraphQL
  const [createSale] = useCreateSaleMutation();
  const { data } = useGetProductsSaleQuery();

  // Date
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;

  // State
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [saleName, setSaleName] = useState("");
  const [productSale, setProductSale] = useState<number>();
  const [productCategory, setProductCategory] = useState<string>("");

  const { register, errors, handleSubmit, control } = useForm<FormValues>({
    criteriaMode: "all",
  });

  const onSubmit = async (form) => {
    console.log(form);

    await createSale({
      variables: { sale: form.saleName, startDate: form.startDate, endDate: form.endDate, productId: form.productSale },
    });

    await router.push("/admin/sales");
  };

  // Events
  const handleChangeCategory = (event: React.ChangeEvent<{ value: unknown }>) => {
    setProductCategory(event.target.value as string);
  };

  return (
    <Box className={classes.content}>
      <Box className={classes.backButton} onClick={() => router.back()}>
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
          name="saleName"
          id="saleName"
          label="Sale"
          inputRef={register({
            required: "This field is required",
            minLength: { value: 2, message: "The product name should contain minimum 2 characters" },
            maxLength: { value: 22, message: "The product name should contain maximum 22 characters" },
          })}
          value={saleName}
          onChange={setSaleName}
          errors={errors}
        />

        <Controller
          control={control}
          name="startDate"
          value={startDate}
          as={
            <DateTimePicker
              clearable
              value={startDate}
              label="Start Date"
              name="startDate"
              format="yyyy/MM/dd hh:mm a"
              minDate={today}
              onChange={setStartDate}
            />
          }
        />

        <Controller
          control={control}
          name="endDate"
          value={endDate}
          as={
            <DateTimePicker
              clearable
              value={endDate}
              label="End Date"
              format="yyyy/MM/dd hh:mm a"
              minDate={today}
              maxDate={new Date("2022-04-25")}
              onChange={setEndDate}
            />
          }
        />

        <FormControl>
          <InputLabel id="productSaleLabel">Product</InputLabel>

          <Controller
            control={control}
            name="productSale"
            as={
              <Select
                labelId="productSaleLabel"
                id="productSale"
                value={productSale}
                onChange={handleChangeCategory}
                className={classes.input}
              >
                {data?.getProducts.products.map((product) => {
                  return <MenuItem value={product._id}>{product.name}</MenuItem>;
                })}
              </Select>
            }
          />
        </FormControl>

        <Box style={{ flexDirection: "row", marginTop: "25px" }}>
          <Button variant="contained" color="secondary" type="submit">
            Create Product Sale
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Product;

// ========================================================================================================

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      flexDirection: "column",
      width: "100%",
    },

    backButton: {
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      width: "120px",
      padding: "0px 0px 15px 0px",
    },

    form: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-evenly",
      height: "400px",
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
