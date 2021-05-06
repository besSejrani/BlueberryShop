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
import { useGetUserQuery, useUpdateBillingInformationMutation, useGetCurrentUserQuery } from "@Graphql/index";

// Apollo State
import { user } from "@Apollo/state/user/index";

// ========================================================================================================

const AccountBilling = () => {
  const classes = useStyles();

  // GraphQL
  const { data, loading } = useGetUserQuery({ variables: { userId: user()._id } });
  const { data: currentUser } = useGetCurrentUserQuery();
  const [updateBillingInformation] = useUpdateBillingInformationMutation();

  // Billing State
  const [billingCountry, setBillingCountry] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [billingCity, setBillingCity] = useState("");
  const [billingZip, setBillingZip] = useState<number>();

  useEffect(() => {
    setBillingAddress(currentUser.getCurrentUser.billing[0].address);
    setBillingCountry(currentUser.getCurrentUser.billing[0].country);
    setBillingCity(currentUser.getCurrentUser.billing[0].city);
    setBillingZip(currentUser.getCurrentUser.billing[0].zip);
  }, [data]);

  // Form
  const { register, errors, handleSubmit } = useForm({
    criteriaMode: "all",
  });

  // Events
  const onSubmitBilling = async (form) => {
    await updateBillingInformation({
      variables: {
        address: form.billingAddress,
        city: form.billingCity,
        country: form.billingCountry,
        zip: parseInt(form.billingZip),
      },
    });

    useToast({ message: "Your billing informations where modified", color: "#00ff00" });
  };

  if (loading) return <div>loading...</div>;

  return (
    <>
      <Box id="billing">
        <Typography variant="h2" style={{ scrollMargin: "100rem 0px 0px 0px" }}>
          Billing Information
        </Typography>

        <form className={classes.form} onSubmit={handleSubmit(onSubmitBilling)}>
          <InputForm
            type="text"
            label="Country"
            name="billingCountry"
            id="billingCountry"
            inputRef={register({
              required: "This field is required",
            })}
            value={billingCountry}
            onChange={setBillingCountry}
            errors={errors}
          />

          <InputForm
            type="text"
            label="Address"
            name="billingAddress"
            id="billingAddress"
            inputRef={register({
              required: "This field is required",
            })}
            value={billingAddress}
            onChange={setBillingAddress}
            errors={errors}
          />

          <InputForm
            type="text"
            label="City"
            name="billingCity"
            id="billingCity"
            inputRef={register({
              required: "This field is required",
            })}
            value={billingCity}
            onChange={setBillingCity}
            errors={errors}
          />

          <InputForm
            type="number"
            label="Zip"
            name="billingZip"
            id="billingZip"
            inputRef={register({
              required: "This field is required",
            })}
            value={billingZip}
            onChange={setBillingZip}
            errors={errors}
          />

          <Button
            type="submit"
            variant="contained"
            color="secondary"
            style={{ width: "250px", margin: "30px 0px 0px 0px" }}
          >
            Update Billing Information
          </Button>
        </form>
      </Box>

      <Divider className={classes.divider} />
    </>
  );
};

export default AccountBilling;

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
  })
);
