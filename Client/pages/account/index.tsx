import React, { useState, useEffect } from "react";

// Material-UI
import { Box, Card, Typography, Button, Divider } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

// Components
import InputForm from "@Components/Form/InputForm/InputForm";
import UploadFile from "@Components/UploadFile/UploadFile";
import AccountSideBar from "@Components/Account/AccountSideBar/AccountSideBar";

// GraphQL
import { useGetUserQuery } from "@Graphql/index";

// Apollo State
import { user } from "@Apollo/state/user/index";

// SSR
import withApollo from "@Apollo/ssr";

// Guard
import { withAuth } from "@Guard/withAuth";

// Icons
import PersonIcon from "@material-ui/icons/Person";
import CreateIcon from "@material-ui/icons/Create";

// ========================================================================================================

const Account = () => {
  const classes = useStyles();

  // GraphQL
  const { data, loading } = useGetUserQuery({ variables: { userId: user()._id } });

  // State
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setUsername(data?.getUser.username);
    setEmail(data?.getUser.email);
  }, [data]);

  if (loading) return <div>loading...</div>;

  return (
    <Box className={classes.root}>
      <AccountSideBar />

      <Card className={classes.userDataCard}>
        <Box id="profile">
          <Typography variant="h2">Profile</Typography>

          <form className={classes.form}>
            <Box className={classes.profileImage}>
              <PersonIcon
                style={{
                  color: "white",
                  borderRadius: 120,
                  fontSize: "200px",
                  backgroundColor: "grey",
                  padding: "3px",
                }}
              />

              <Box className={classes.uploadbutton}>
                <UploadFile name="" filesLimit={1}>
                  <CreateIcon />
                </UploadFile>
              </Box>
            </Box>

            <InputForm
              type="text"
              label="Username"
              name="username"
              id="username"
              value={username}
              onChange={setUsername}
              errors={null}
            />

            <InputForm
              type="email"
              label="Email"
              name="email"
              id="email"
              value={email}
              onChange={setEmail}
              errors={null}
            />

            <Button
              type="submit"
              variant="contained"
              color="secondary"
              style={{ width: "150px", margin: "30px 0px 0px 0px" }}
            >
              Update Profile
            </Button>
          </form>
        </Box>

        <Divider className={classes.divider} />

        <Box id="billing">
          <Typography variant="h2">Billing Information</Typography>

          <form className={classes.form}>
            <InputForm
              type="password"
              label="Old Password"
              name="oldPassword"
              id="oldPassword"
              value={username}
              onChange={setUsername}
              errors={null}
            />

            <InputForm
              type="password"
              label="Password"
              name="password"
              id="password"
              value={email}
              onChange={setEmail}
              errors={null}
            />
            <InputForm
              type="password"
              label="Confirm Password"
              name="confirmPassword"
              id="confirmPassword"
              value={username}
              onChange={setUsername}
              errors={null}
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
              type="password"
              label="Old Password"
              name="oldPassword"
              id="oldPassword"
              value={username}
              onChange={setUsername}
              errors={null}
            />

            <InputForm
              type="password"
              label="Password"
              name="password"
              id="password"
              value={email}
              onChange={setEmail}
              errors={null}
            />
            <InputForm
              type="password"
              label="Confirm Password"
              name="confirmPassword"
              id="confirmPassword"
              value={username}
              onChange={setUsername}
              errors={null}
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
              value={username}
              onChange={setUsername}
              errors={null}
            />

            <InputForm
              type="password"
              label="Password"
              name="password"
              id="password"
              value={email}
              onChange={setEmail}
              errors={null}
            />
            <InputForm
              type="password"
              label="Confirm Password"
              name="confirmPassword"
              id="confirmPassword"
              value={username}
              onChange={setUsername}
              errors={null}
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
