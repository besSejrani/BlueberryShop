import React, { useState, useEffect } from "react";

// React-Hook-Form
import { useForm } from "react-hook-form";

// Material-UI
import { Box, Typography, Button, Divider } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";

// Components
import InputForm from "@Components/Form/InputForm/InputForm";

// Hooks
import useToast from "@Hook/useToast";

// GraphQL
import { useGetUserQuery, useUpdateShippingInformationMutation, useGetCurrentUserQuery } from "@Graphql/index";

// Apollo State
import { user } from "@Apollo/state/user/index";

// ========================================================================================================

const AccountShipping = () => {
  const classes = useStyles();

  // GraphQL
  const { data, loading } = useGetUserQuery({ variables: { userId: user()._id } });
  const { data: currentUser } = useGetCurrentUserQuery();
  const [updateShippingInformation] = useUpdateShippingInformationMutation();

  // Shipping State
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [shippingCity, setShippingCity] = useState("");
  const [shippingZip, setShippingZip] = useState<number>();

  useEffect(() => {
    setShippingAddress(currentUser.getCurrentUser.shipping[0].address);
    setShippingCountry(currentUser.getCurrentUser.shipping[0].country);
    setShippingCity(currentUser.getCurrentUser.shipping[0].city);
    setShippingZip(currentUser.getCurrentUser.shipping[0].zip);
  }, [data]);

  // Form
  const { register, errors, handleSubmit } = useForm({
    criteriaMode: "all",
  });

  // Events
  const onSubmitShipping = async (form) => {
    console.log(form);

    await updateShippingInformation({
      variables: {
        address: form.shippingAddress,
        city: form.shippingCity,
        country: form.shippingCountry,
        zip: parseInt(form.shippingZip),
      },
    });

    useToast({ message: "Your shipping informations where modified", color: "#00ff00" });
  };

  if (loading) return <div>loading...</div>;

  return (
    <>
      <Box id="shipping">
        <Typography variant="h2" style={{ scrollPadding: "30px 0px 0px 0px" }}>
          Shipping Information
        </Typography>

        <form className={classes.form} onSubmit={handleSubmit(onSubmitShipping)}>
          <InputForm
            type="text"
            label="Country"
            name="shippingCountry"
            id="shippingCountry"
            inputRef={register({
              required: "This field is required",
            })}
            value={shippingCountry}
            onChange={setShippingCountry}
            errors={errors}
          />

          <InputForm
            type="text"
            label="Address"
            name="shippingAddress"
            id="shippingAddress"
            inputRef={register({
              required: "This field is required",
            })}
            value={shippingAddress}
            onChange={setShippingAddress}
            errors={errors}
          />

          <InputForm
            type="text"
            label="City"
            name="shippingCity"
            id="shippingCity"
            inputRef={register({
              required: "This field is required",
            })}
            value={shippingCity}
            onChange={setShippingCity}
            errors={errors}
          />

          <InputForm
            type="number"
            label="Zip"
            name="shippingZip"
            id="shippingZip"
            inputRef={register({
              required: "This field is required",
            })}
            value={shippingZip}
            onChange={setShippingZip}
            errors={errors}
          />

          <Button
            type="submit"
            variant="contained"
            color="secondary"
            style={{ width: "260px", margin: "30px 0px 0px 0px" }}
          >
            Update Shipping Information
          </Button>
        </form>
      </Box>

      <Divider className={classes.divider} />
    </>
  );
};

export default AccountShipping;

// ========================================================================================================

const useStyles = makeStyles(() =>
  createStyles({
    form: {
      display: "flex",
      flexDirection: "column",
      margin: "45px 0px 0px 0px",
    },

    divider: {
      margin: "50px 0px",
    },
  }),
);
