import React, { useState } from "react";

// Material-UI
import { Box, Card } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

// Components
import AccountSideBar from "@Components/Account/AccountSideBar/AccountSideBar";
import AccountProfile from "@Components/Account/AccountProfile/AccountProfile";
import AccountBilling from "@Components/Account/AccountBilling/AccountBilling";
import AccountShipping from "@Components/Account/AccountShipping/AccountShipping";
import AccountResetPassword from "@Components/Account/AccountResetPassword/AccountResetPassword";

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

  // useEffect(() => {
  //   // setShippingAddress(currentUser.getCurrentUser.shipping[0].address);
  //   // setShippingCountry(currentUser.getCurrentUser.shipping[0].country);
  //   // setShippingCity(currentUser.getCurrentUser.shipping[0].city);
  //   // setShippingZip(currentUser.getCurrentUser.shipping[0].zip);
  // }, [data]);

  if (loading) return <div>loading...</div>;

  return (
    <Box className={classes.root}>
      <AccountSideBar />

      <Card className={classes.userDataCard}>
        <AccountProfile />

        <AccountBilling />

        <AccountShipping />

        <AccountResetPassword />
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
  })
);
