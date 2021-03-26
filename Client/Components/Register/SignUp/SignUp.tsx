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
import { useSignupMutation } from "../../../Graphql";

// ========================================================================================================

type FormValues = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUp = () => {
  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { register, errors, handleSubmit } = useForm<FormValues>({
    criteriaMode: "all",
  });

  const router = useRouter();

  const [signUp] = useSignupMutation();

  const onSubmit = async (form) => {
    if (password !== confirmPassword) {
      await alert("passwords don't match");
      return;
    }

    const { data } = await signUp({
      variables: { email: form.email, password: form.password, username: form.username },
    });

    router.push("/validation/email");
  };

  return (
    <Box>
      <Card elevation={0} className={classes.signin}>
        <Image
          width={700}
          height={520}
          className={classes.media}
          src={"/static/Water24.webp"}
          // title={product.title}
        />

        <Box className={classes.content}>
          <Box>
            <Typography variant="h4" style={{ fontSize: "1.85rem" }}>
              I do not have an account
            </Typography>
            <Typography variant="body1" style={{ marginTop: 5 }}>
              Register a new account
            </Typography>
          </Box>

          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <InputForm
              type="text"
              name="username"
              id="signupUsername"
              label="Username"
              inputRef={register({
                required: "This field is required",
                minLength: { value: 3, message: "Your username should contain minimum 3 characters" },
                maxLength: { value: 20, message: "Your username should contain maximum 20 characters" },
              })}
              value={username}
              onChange={setUsername}
              errors={errors}
            />

            <InputForm
              type="email"
              name="email"
              id="signupEmail"
              label="Email"
              inputRef={register({
                required: "This field is required",
                minLength: { value: 8, message: "Your email should contain minimum 8 characters" },
              })}
              value={email}
              onChange={setEmail}
              errors={errors}
            />

            <InputForm
              type="password"
              name="password"
              id="signupPassword"
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
              id="signupConfirmPassword"
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
                Sign up
              </Button>
            </Box>
          </form>
        </Box>
      </Card>
    </Box>
  );
};

export default SignUp;

// ========================================================================================================

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
