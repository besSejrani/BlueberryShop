import React, { useState, useEffect } from "react";

// Next
import { useRouter } from "next/router";

// Material-UI
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";

// Date Picker
import { DateTimePicker } from "@material-ui/pickers";

// Components
import InputForm from "@Components/Form/InputForm/InputForm";
import BackButton from "@Components/BackButon/BackButton";

// React-Hook-Form
import { useForm, Controller } from "react-hook-form";

// Apollo
import { useUpdateSaleMutation, useGetSaleQuery } from "@Graphql/index";

// ========================================================================================================

type FormValues = {
  productName: string;
  productPrice: number;
  productDescription: string;
  productStock: number;
  product: string;
};

const Product = () => {
  const classes = useStyles();
  const router = useRouter();

  const { query } = router;

  // GraphQL
  const { data, loading } = useGetSaleQuery({ variables: { productId: query.id as string } });
  const [updateSale] = useUpdateSaleMutation();

  // State
  const [saleName, setSaleName] = useState("");
  const [saleDiscount, setSaleDiscount] = useState<number>(0);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [product, setProduct] = useState<string>("");

  useEffect(() => {
    setSaleName(data?.getSale.sale);
    setSaleDiscount(data?.getSale.discount);
    setStartDate(new Date(data?.getSale.startDate));
    setEndDate(new Date(data?.getSale.endDate));
  }, [data]);

  // React Hook Form
  const { register, errors, handleSubmit, control } = useForm<FormValues>({
    criteriaMode: "all",
  });

  const onSubmit = async (form) => {
    await updateSale({
      variables: {
        productId: query.id as string,
        sale: form.saleName,
        discount: form.saleDiscount,
        startDate: startDate,
        endDate: endDate,
      },
    });

    await router.push("/admin/sales");
  };

  // Events
  const handleChangeProduct = (event: React.ChangeEvent<{ value: unknown }>) => {
    setProduct(event.target.value as string);
  };

  if (loading) return <div>loading...</div>;

  return (
    <Box className={classes.content}>
      <BackButton />
      <Box>
        <Typography variant="h4" style={{ fontSize: "1.85rem" }}>
          Update Product Sale
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
          value={startDate}
          as={
            <>
              <DateTimePicker
                clearable
                value={startDate}
                label="Start Date"
                name="startDate"
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
                name="endDate"
                format="DD.MM.yyyy HH:mm"
                disablePast
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
                onChange={handleChangeProduct}
                className={classes.input}
              >
                {data?.getSale.products.map((product) => {
                  return <MenuItem value={product._id}>{product.name}</MenuItem>;
                })}
              </Select>
            }
          />
        </FormControl>

        <Box style={{ flexDirection: "row", marginTop: "25px" }}>
          <Button variant="contained" color="secondary" type="submit">
            Update Product Sale
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Product;

// ========================================================================================================

const useStyles = makeStyles(() =>
  createStyles({
    content: {
      flexDirection: "column",
      width: "100%",
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
