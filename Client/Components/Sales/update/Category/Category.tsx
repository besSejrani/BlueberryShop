import React, { useState } from "react";

// Next
import { useRouter } from "next/router";

// Material-UI
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

// Date Picker
import { DateTimePicker } from "@material-ui/pickers";

// Components
import InputForm from "@Components/InputForm/InputForm";
import BackButton from "@Components/BackButon/BackButton";

// React-Hook-Form
import { useForm, Controller } from "react-hook-form";

// Apollo
import { useGetCategoriesQuery } from "@Graphql/index";

// ========================================================================================================

type FormValues = {
  productName: string;
  productPrice: number;
  productDescription: string;
  productStock: number;
  productCategory: string;
  productPromotion: boolean;
};

const Category = () => {
  const classes = useStyles();
  const router = useRouter();

  // GraphQL
  const { data } = useGetCategoriesQuery();

  // State
  // State
  const [saleName, setSaleName] = useState(data?.getSale.sale);
  const [saleDiscount, setSaleDiscount] = useState<number>(data?.getSale.discount);
  const [startDate, setStartDate] = useState(new Date(data?.getSale.startDate));
  const [endDate, setEndDate] = useState(new Date(data?.getSale.endDate));

  const { register, errors, handleSubmit, control } = useForm<FormValues>({
    criteriaMode: "all",
  });

  const onSubmit = async (form) => {
    await router.push("/admin/sales");
  };

  // Events
  const handleChangeCategory = (event: React.ChangeEvent<{ value: unknown }>) => {
    setProductCategory(event.target.value as string);
  };

  return (
    <Box className={classes.content}>
      <BackButton />
      <Box>
        <Typography variant="h4" style={{ fontSize: "1.85rem" }}>
          Update Category Sale
        </Typography>
      </Box>

      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <InputForm
          type="text"
          name="promotionName"
          id="promotionName"
          label="Sale"
          inputRef={register({
            required: "This field is required",
            minLength: { value: 2, message: "The product name should contain minimum 2 characters" },
            maxLength: { value: 22, message: "The product name should contain maximum 22 characters" },
          })}
          value={promotionName}
          onChange={setPromotionName}
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
                format="DD.MM.yyyy hh:mm"
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
                format="DD.MM.yyyy hh:mm"
                disablePast
                onChange={setEndDate}
              />
            </>
          }
        />

        <FormControl>
          <InputLabel id="productPromotionLabel">Category</InputLabel>

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

        <Box style={{ flexDirection: "row", marginTop: "25px" }}>
          <Button variant="contained" color="secondary" type="submit">
            Create Product Sale
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Category;

// ========================================================================================================

const useStyles = makeStyles((theme: Theme) =>
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
