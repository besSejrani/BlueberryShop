import React, { useState } from "react";

// Next
import Image from "next/image";
import { useRouter } from "next/router";

// React-Hook-Form
import { useForm } from "react-hook-form";

// Material-UI
import { Card, Box, Button, Typography } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";

// Components
import InputForm from "@Components/Form/InputForm/InputForm";

// Apollo
import { useForgotPasswordMutation } from "@Graphql/index";

// SSR
import withApollo from "@Apollo/ssr";

// ========================================================================================================

type FormValues = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignIn = () => {
  const classes = useStyles();

  const [email, setEmail] = useState("");

  const { register, errors, handleSubmit } = useForm<FormValues>({
    criteriaMode: "all",
  });

  const router = useRouter();

  const [signUp] = useForgotPasswordMutation();

  const onSubmit = async (form) => {
    await signUp({
      variables: { email: form.email },
    });

    router.push("/validation/password/confirm");
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
              src="/Water13.webp"
              // title={product.title}
            />

            <Box className={classes.content}>
              <Box>
                <Typography variant="h4" style={{ fontSize: "1.85rem" }}>
                  Forgot Password
                </Typography>
                <Typography variant="body1" style={{ marginTop: 5 }}>
                  Reset your password
                </Typography>
              </Box>

              <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
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

                <Box className={classes.actionButtons}>
                  <Button type="submit" variant="outlined" color="secondary">
                    Reset Password
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

export default withApollo({ ssr: true })(SignIn);

// ========================================================================================================

const useStyles = makeStyles(() =>
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
  }),
);
