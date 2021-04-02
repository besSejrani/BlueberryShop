import React, { useState } from "react";

// Next
import Image from "next/image";
import { useRouter } from "next/router";

// React-Hook-Form
import { useForm } from "react-hook-form";

// Material-UI
import { Card, Box, Button, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

// Components
import InputForm from "@Components/InputForm/InputForm";

// Apollo
import { useChangePasswordMutation } from "@Graphql/index";

// SSR
import withApollo from "@Apollo/ssr";

// ========================================================================================================

type FormValues = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const ChangePassword = ({ query }) => {
  const classes = useStyles();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { register, errors, handleSubmit } = useForm<FormValues>({
    criteriaMode: "all",
  });

  const router = useRouter();

  const [changePassword] = useChangePasswordMutation();

  const onSubmit = async (form) => {
    if (password !== confirmPassword) {
      await alert("passwords don't match");
      return;
    }

    const { data } = await changePassword({
      variables: { password: form.password, token: query.id },
    });

    router.push("/");
  };

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <Box>
          <Card elevation={0} className={classes.signin}>
            <Image
              width={700}
              height={520}
              className={classes.media}
              src={"/Water13.png"}
              // title={product.title}
            />

            <Box className={classes.content}>
              <Box>
                <Typography variant="h4" style={{ fontSize: "1.85rem" }}>
                  Change your password
                </Typography>
              </Box>

              <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                <InputForm
                  type="password"
                  name="password"
                  id="password"
                  label="Password"
                  inputRef={register({
                    required: "This field is required",
                    minLength: { value: 8, message: "Your password should contain minimum 8 characters" },
                  })}
                  value={password}
                  onChange={setPassword}
                  errors={errors}
                />

                <InputForm
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  label="Confirm Password"
                  inputRef={register({
                    required: "This field is required",
                    minLength: { value: 8, message: "Your confirm password should contain minimum 8 characters" },
                  })}
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                  errors={errors}
                />
                <Box className={classes.actionButtons}>
                  <Button type="submit" variant="outlined" color="secondary">
                    Change Password
                  </Button>
                </Box>
              </form>
            </Box>
          </Card>
        </Box>
      </Card>
    </div>
  );
};

export default withApollo({ ssr: true })(ChangePassword);

ChangePassword.getInitialProps = async ({ query }) => {
  return { query };
};

// ========================================================================================================

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-evenly",
      alignItems: "center",
    },
    card: {
      position: "relative",
      width: "1100px",
      height: 520,
      borderRadius: "10px",
    },

    signin: {
      display: "flex",
      height: 520,
      justifyContent: "space-between",
    },

    media: {
      width: "69%",
      height: "100%",
    },

    content: {
      width: "31%",
      display: "flex",
      flexDirection: "column",
      padding: "20px 30px",
    },

    form: {
      display: "flex",
      flexDirection: "column",
      margin: "30px 0px 0px 0px",
    },

    actionButtons: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",

      marginTop: "30px",
    },
  })
);
