import React, { useState } from "react";

// Next
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

// React-Hook-Form
import { useForm } from "react-hook-form";

// Material-UI
import { Card, Box, Button, Typography } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";

// Hooks
import useToast from "@Hook/useToast";

// Icons
import TwitterIcon from "@material-ui/icons/Twitter";
import GithubIcon from "@material-ui/icons/GitHub";

// Apollo
import { apolloClient } from "@Apollo/ssr";
import { useSigninMutation, GetCurrentUserDocument, GetCurrentUserQuery } from "@Graphql/index";

// Apollo State
import { user } from "@Apollo/state/user/index";

// Components
import InputForm from "../../Form/InputForm/InputForm";

// ========================================================================================================

type FormValues = {
  email: string;
  password: string;
};

const SignIn = () => {
  const classes = useStyles();
  const router = useRouter();

  // React Hook Form
  const { register, errors, handleSubmit } = useForm<FormValues>({
    criteriaMode: "all",
  });

  // State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // GraphQL
  const [signIn] = useSigninMutation();

  // Events
  const onSubmit = async (form) => {
    const { data } = await signIn({
      variables: { email: form.email, password: form.password },
    });

    localStorage.setItem("token", data?.signin.token!);

    const result = await apolloClient?.query<GetCurrentUserQuery>({ query: GetCurrentUserDocument });

    apolloClient.resetStore();

    user({
      _id: result?.data?.getCurrentUser?._id,
      username: result?.data?.getCurrentUser?.username,
      role: result?.data?.getCurrentUser?.role,
      profileImageUrl: result?.data?.getCurrentUser?.profileImageUrl,
    });

    router.push("/products");
    await useToast({ message: "Successful Authentication", color: "#00ff00" });
  };

  return (
    <Box>
      <Card elevation={0} className={classes.signin}>
        <Image className={classes.media} width={790} height={520} src="/Sand2.webp" />

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
                  startIcon={<img src="/google.svg" width="20" alt="" />}
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

const useStyles = makeStyles(() =>
  createStyles({
    signin: {
      display: "flex",
      height: "620px",
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
  }),
);
