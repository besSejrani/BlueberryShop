import React, { useState } from "react";

// Next
import { useRouter } from "next/router";

// Material-UI
import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, Typography } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

// Icons
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

// Date Picker
import { DatePicker, TimePicker, DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

// Components
import InputForm from "@Components/InputForm/InputForm";

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
  const [selectedDate, handleDateChange] = useState(new Date());
  const [promotionName, setPromotionName] = useState("");
  const [productPromotion, setProductPromotion] = useState<number>();
  const [productCategory, setProductCategory] = useState<string>("");

  const { register, errors, handleSubmit, control } = useForm<FormValues>({
    criteriaMode: "all",
  });

  const onSubmit = async (form) => {
    console.log(form);

    await router.push("/admin/sales");
  };

  // Events
  const handleChangeCategory = (event: React.ChangeEvent<{ value: unknown }>) => {
    setProductCategory(event.target.value as string);
  };

  console.log(selectedDate);

  let today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;

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
          Create a category sale
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
          style={{ margin: 0 }}
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