import React, { useState, useEffect } from "react";

// React-Hook-Form
import { useForm } from "react-hook-form";

// Material-UI
import { Box, Card, Typography, Button } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

// Components
import InputForm from "@Components/Form/InputForm/InputForm";
import AccountSideBar from "@Components/Account/AccountSideBar/AccountSideBar";
import AccountProfile from "@Components/Account/AccountProfile/AccountProfile";
import AccountBilling from "@Components/Account/AccountBilling/AccountBilling";
import AccountShipping from "@Components/Account/AccountShipping/AccountShipping";

// Hooks
import useToast from "@Hook/useToast";

// GraphQL
import { useGetUserQuery, useResetPasswordMutation, useGetCurrentUserQuery } from "@Graphql/index";

// Apollo State
import { user } from "@Apollo/state/user/index";

// SSR
import withApollo from "@Apollo/ssr";

// Guard
import { withAuth } from "@Guard/withAuth";

// ========================================================================================================

const Account = () => {
  const classes = useStyles();

  // GraphQL
  const { data, loading } = useGetUserQuery({ variables: { userId: user()._id } });
  const { data: currentUser } = useGetCurrentUserQuery();
  const [resetPassword] = useResetPasswordMutation();

  // Password State
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // useEffect(() => {
  //   // setShippingAddress(currentUser.getCurrentUser.shipping[0].address);
  //   // setShippingCountry(currentUser.getCurrentUser.shipping[0].country);
  //   // setShippingCity(currentUser.getCurrentUser.shipping[0].city);
  //   // setShippingZip(currentUser.getCurrentUser.shipping[0].zip);
  // }, [data]);

  // Form
  const { register, errors, handleSubmit, control } = useForm({
    criteriaMode: "all",
  });

  // Events
  const onSubmitReset = async (form) => {
    if (form.password !== form.confirmPassword) {
      useToast({ message: "Password and Confirm Password doesn't match", color: "#ff0000" });
    }

    if (form.password === form.confirmPassword) {
      await resetPassword({
        variables: {
          oldpassword: form.oldPassword,
          newPassword: form.password,
        },
      });

      useToast({ message: "Password was reseted", color: "#00ff00" });
    }
  };

  if (loading) return <div>loading...</div>;

  return (
    <Box className={classes.root}>
      <AccountSideBar />

      <Card className={classes.userDataCard}>
        <AccountProfile />

        <AccountBilling />

        <AccountShipping />

        <Box id="reset">
          <Typography variant="h2" style={{ scrollPadding: "30px 0px 0px 0px" }}>
            Reset Password
          </Typography>

          <form className={classes.form} onSubmit={handleSubmit(onSubmitReset)}>
            <InputForm
              type="password"
              label="Old Password"
              name="oldPassword"
              id="oldPassword"
              inputRef={register({
                required: "This field is required",
              })}
              value={oldPassword}
              onChange={setOldPassword}
              errors={errors}
            />

            <InputForm
              type="password"
              label="Password"
              name="password"
              id="password"
              inputRef={register({
                required: "This field is required",
              })}
              value={password}
              onChange={setPassword}
              errors={errors}
            />
            <InputForm
              type="password"
              label="Confirm Password"
              name="confirmPassword"
              id="confirmPassword"
              inputRef={register({
                required: "This field is required",
              })}
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
