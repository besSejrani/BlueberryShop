import React, { useState } from "react";

// React-Hook-Form
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

// Material-UI
import { Box, Typography, TextField, Button } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";

// Icons
import SendIcon from "@material-ui/icons/Send";

// ========================================================================================================

const Newsletter = () => {
  const classes = useStyles();

  const [email, setEmail] = useState<string>("");

  const { register, errors } = useForm({
    criteriaMode: "all",
  });

  return (
    <form className={classes.form}>
      <Box>
        <TextField
          type="email"
          name="email"
          id="newsletter"
          label="Newsletter"
          variant="outlined"
          value={email}
          onChange={(text) => setEmail(text.target.value)}
          className={classes.inputEmail}
          InputLabelProps={{ style: { color: "white" } }}
          inputProps={{ className: classes.input }}
          inputRef={register({
            required: "This field is required",
          })}
        />

        <ErrorMessage
          errors={errors}
          name="email"
          as={<Typography style={{ color: "white", margin: "5px 0px 0px 3px" }} variant="body2" />}
        >
          {({ messages }) => messages && Object.entries(messages).map(([type, message]) => <p key={type}>{message}</p>)}
        </ErrorMessage>
      </Box>

      <Button type="submit" variant="contained" color="primary" className={classes.formSubmit}>
        <SendIcon style={{ color: "white" }} />
      </Button>
    </form>
  );
};

export default Newsletter;

// ========================================================================================================

const useStyles = makeStyles(() =>
  createStyles({
    form: {
      display: "flex",
    },

    inputEmail: {
      backgroundColor: "#212121",
      border: "1px solid black",
      borderRadius: "10px 0px 0px 10px",
    },
    input: {
      color: "white",
    },

    formSubmit: {
      width: 50,
      height: 58.5,
      border: "1px solid black",
      backgroundColor: "#000",
      borderRadius: "0px 10px 10px 0px",
    },
  }),
);
