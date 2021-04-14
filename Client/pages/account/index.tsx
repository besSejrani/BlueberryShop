import React, { useState, useEffect } from "react";

// React-Hook-Form
import { useForm } from "react-hook-form";

// Material-UI
import { Box, Card, Typography, Button, Divider } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

// Components
import InputForm from "@Components/Form/InputForm/InputForm";
import AccountSideBar from "@Components/Account/AccountSideBar/AccountSideBar";
import AccountProfile from "@Components/Account/AccountProfile/AccountProfile";

// GraphQL
import { useGetUserQuery, useUpdateBillingInformationMutation, useGetCurrentUserQuery } from "@Graphql/index";

// Apollo State
import { useReactiveVar } from "@apollo/client";
import { user } from "@Apollo/state/user/index";
import { product } from "@Apollo/state/product/index";

// SSR
import withApollo from "@Apollo/ssr";

// Guard
import { withAuth } from "@Guard/withAuth";

// ========================================================================================================

const Account = () => {
  const classes = useStyles();

  // Apollo State
  const account = useReactiveVar(product);

  // GraphQL
  const { data, loading } = useGetUserQuery({ variables: { userId: user()._id } });
  const { data: currentUser } = useGetCurrentUserQuery();
  const [updateBillingInformation] = useUpdateBillingInformationMutation();

  console.log("graph", currentUser);

  // Profile State
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  // Billing State
  const [billingCountry, setBillingCountry] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [billingCity, setBillingCity] = useState("");
  const [billingZip, setBillingZip] = useState("");

  // Shipping State
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [shippingCity, setShippingCity] = useState("");
  const [shippingZip, setShippingZip] = useState("");

  // Password State
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    setUsername(data?.getUser.username);
    setEmail(data?.getUser.email);
  }, [data]);

  // Form
  const { register, errors, handleSubmit, control } = useForm({
    criteriaMode: "all",
  });

  // Events

  const onSubmitBilling = async (form) => {
    console.log(form);
    await updateBillingInformation({
      variables: {
        address: form.billingAddress,
        city: form.billingCity,
        country: form.billingCountry,
        zip: parseInt(form.billingZip),
      },
    });
  };

  if (loading) return <div>loading...</div>;

  return (
    <Box className={classes.root}>
      <AccountSideBar />

      <Card className={classes.userDataCard}>
        <AccountProfile />

        <Box id="billing">
          <Typography variant="h2">Billing Information</Typography>

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

        <Box id="shipping">
          <Typography variant="h2">Shipping Information</Typography>

          <form className={classes.form}>
            <InputForm
              type="text"
              label="Country"
              name="country"
              id="country"
              value={shippingCountry}
              onChange={setShippingCountry}
              errors={errors}
            />

            <InputForm
              type="text"
              label="Address"
              name="address"
              id="address"
              value={shippingAddress}
              onChange={setShippingAddress}
              errors={errors}
            />

            <InputForm
              type="text"
              label="City"
              name="city"
              id="city"
              value={shippingCity}
              onChange={setShippingCity}
              errors={errors}
            />

            <InputForm
              type="number"
              label="Zip"
              name="zip"
              id="zip"
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

        <Box id="reset">
          <Typography variant="h2">Reset Password</Typography>

          <form className={classes.form}>
            <InputForm
              type="password"
              label="Old Password"
              name="oldPassword"
              id="oldPassword"
              value={oldPassword}
              onChange={setOldPassword}
              errors={errors}
            />

            <InputForm
              type="password"
              label="Password"
              name="password"
              id="password"
              value={password}
              onChange={setPassword}
              errors={errors}
            />
            <InputForm
              type="password"
              label="Confirm Password"
              name="confirmPassword"
              id="confirmPassword"
              value={confirmPassword}
              onChange={setConfirmPassword}
              errors={errors}
            />

            <Button
              type="submit"
              variant="contained"
              color="secondary"
              style={{ width: "160px", margin: "30px 0px 0px 0px" }}
            >
              Reset Password
            </Button>
          </form>
        </Box>
      </Card>
    </Box>
  );
};

export default withApollo({ ssr: true })(withAuth(Account));

// ========================================================================================================

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      height: "100%",
      margin: "0px 0px 50px 0px",
    },

    userDataCard: {
      borderRadius: 15,
      display: "flex",
      flexDirection: "column",
      height: "100%",
      width: "72%",
      padding: "2rem",
      boxSizing: "border-box",
    },

    profileImage: {
      position: "relative",
      borderRadius: 150,
      cursor: "pointer",
      width: 200,
      height: 200,
    },

    uploadbutton: {
      position: "absolute",
      bottom: 0,
      left: 140,
    },

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
