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
import { useGetProductsSaleQuery, useCreateSaleMutation, GetSalesDocument, GetSalesQuery } from "@Graphql/index";

// ========================================================================================================

type FormValues = {
  productName: string;
  productPrice: number;
  productDescription: string;
  productStock: number;
  product: string;
  productSale: boolean;
};

const Product = () => {
  const classes = useStyles();
  const router = useRouter();

  // GraphQL
  const [createSale] = useCreateSaleMutation();
  const { data } = useGetProductsSaleQuery();

  // State
  const [saleName, setSaleName] = useState("");
  const [saleDiscount, setSaleDiscount] = useState<number>();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [productSale, setProductSale] = useState<number>();
  const [product, setProduct] = useState<string>("");

  const { register, errors, handleSubmit, control } = useForm<FormValues>({
    criteriaMode: "all",
  });

  const onSubmit = async (form) => {
    console.log(form);

    await createSale({
      variables: {
        sale: form.saleName,
        startDate: startDate,
        endDate: endDate,
        discount: form.saleDiscount,
        productId: form.productSale,
      },
      update(cache, { data }) {
        const newSale = data?.createSale;

        const { getSales }: GetSalesQuery = cache.readQuery({
          query: GetSalesDocument,
        });

        cache.writeQuery({
          query: GetSalesDocument,
          data: {
            getSales: [...getSales, newSale],
          },
        });
      },
    });

    await router.push("/admin/sales");
  };

  // Events
  const handleChangeProduct = (event: React.ChangeEvent<{ value: unknown }>) => {
    setProduct(event.target.value as string);
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
          Create Product Sale
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

        <InputForm
          type="number"
          name="saleDiscount"
          id="saleDiscount"
          label="Discount"
          inputRef={register({
            required: "This field is required",
            maxLength: { value: 2, message: "The sale discount field should contain maximum 2 digits" },
            min: { value: 0, message: "The sale discount field can not be a negative number" },
            max: { value: 100, message: "The sale discount field can not be a higher than 100" },
          })}
          value={saleDiscount}
          onChange={setSaleDiscount}
          errors={errors}
        />

        <Controller
          control={control}
          name="startDate"
          as={
            <>
              <DateTimePicker
                clearable
                value={startDate}
                label="Start Date"
                format="DD.MM.yyyy HH:mm"
                disablePast
                onChange={setStartDate}
              />
            </>
          }
        />

        <Controller
          control={control}
          name="endDate"
          as={
            <>
              <DateTimePicker
                clearable
                value={endDate}
                label="End Date"
                format="DD.MM.yyyy HH:mm"
                disablePast
                maxDate={new Date("2022-04-25")}
                onChange={setEndDate}
              />
            </>
          }
        />

        <FormControl>
          <InputLabel id="productSaleLabel">Product</InputLabel>

          <Controller
            control={control}
            name="productSale"
            inputRef={register({
              required: "This field is required",
            })}
            as={
              <Select
                labelId="productSaleLabel"
                id="productSale"
                value={productSale}
                onChange={handleChangeProduct}
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
      height: "380px",
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
