import React, { useState } from "react";

// React-Hook-Form
import { useForm } from "react-hook-form";

// Material-UI
import { Box, Typography, Button } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

// Components
import InputForm from "@Components/Form/InputForm/InputForm";

// Hooks
import useToast from "@Hook/useToast";

// GraphQL
import { useResetPasswordMutation } from "@Graphql/index";

// ========================================================================================================

const AccountResetPassword = () => {
  const classes = useStyles();

  // GraphQL
  const [resetPassword] = useResetPasswordMutation();

  // Password State
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

      setOldPassword("");
      setPassword("");
      setConfirmPassword("");

      useToast({ message: "Password was reseted", color: "#00ff00" });
    }
  };

  return (
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
  );
};

export default AccountResetPassword;

// ========================================================================================================

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      display: "flex",
      flexDirection: "column",
      margin: "45px 0px 0px 0px",
    },
  })
);
