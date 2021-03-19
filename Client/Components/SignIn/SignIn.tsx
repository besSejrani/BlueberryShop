import React, { useState } from "react";

// Next
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

// React-Hook-Form
import { useForm } from "react-hook-form";

// Material-UI
import { Card, Box, Button, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

// React-Toastify
import { toast } from "react-toastify";

// Components
import InputForm from "../InputForm/InputForm";

// Icons
import TwitterIcon from "@material-ui/icons/Twitter";
import GithubIcon from "@material-ui/icons/GitHub";

// Apollo
import { useSigninMutation } from "../../Graphql/index";

// ========================================================================================================

type FormValues = {
  email: string;
  password: string;
};

const SignIn = () => {
  const classes = useStyles();
  const router = useRouter();

  const { register, errors, handleSubmit } = useForm<FormValues>({
    criteriaMode: "all",
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signIn] = useSigninMutation();

  const toaster = () => {
    toast.dark("Successful authentication", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const onSubmit = async (form) => {
    const { data } = await signIn({
      variables: { email: form.email, password: form.password },
    });

    localStorage.setItem("token", data?.signin.token!);

    router.push("/products");
    await toaster();
  };

  return (
    <Box>
      <Card elevation={0} className={classes.signin}>
        <Image className={classes.media} width={790} height={520} src={"/static/Sand2.webp"} />

        <Box className={classes.content}>
          <Box>
            <Typography variant="h4" style={{ fontSize: "1.85rem" }}>
              I already have an account
            </Typography>
            <Typography variant="body1" style={{ marginTop: 5 }}>
              Sign in with social media or your email and password
            </Typography>

            <Box className={classes.socialbuttons}>
              <a href="http://localhost:4000/auth/google">
                <Button
                  variant="contained"
                  style={{ backgroundColor: "white" }}
                  startIcon={<img src="/static/google.svg" width="20" />}
                >
                  Google
                </Button>
              </a>

              <a href="http://localhost:4000/auth/github">
                <Button variant="contained" color="primary" startIcon={<GithubIcon />}>
                  Github
                </Button>
              </a>
              <a href="http://localhost:4000/auth/twitter">
                <Button variant="contained" color="secondary" startIcon={<TwitterIcon />}>
                  Twitter
                </Button>
              </a>
            </Box>
          </Box>

          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <InputForm
              type="email"
              name="email"
              id="signinEmail"
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
              id="signinPassword"
              label="Password"
              inputRef={register({
                required: "This field is required",
                minLength: { value: 8, message: "Your password should contain minimum 8 characters" },
              })}
              value={password}
              onChange={setPassword}
              errors={errors}
            />

            <Box className={classes.actionButtons}>
              <Button type="submit" variant="outlined" color="secondary">
                Signin
              </Button>

              <Link href="/validation/password">
                <Typography variant="body2" style={{ cursor: "pointer" }}>
                  Forgot Password ?
                </Typography>
              </Link>
            </Box>
          </form>
        </Box>
      </Card>
    </Box>
  );
};

export default SignIn;

// ========================================================================================================

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    signin: {
      display: "flex",
      height: "520px",
      justifyContent: "space-between",
    },

    media: {
      width: "65%",
      height: "100%",
    },

    content: {
      width: "35%",
      flexDirection: "column",
      padding: "20px 30px",
    },

    form: {
      display: "flex",
      flexDirection: "column",
      margin: "45px 0px 0px 0px",
    },

    socialbuttons: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "30px",
    },

    actionButtons: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",

      marginTop: "30px",
    },
  })
);
