import React, { useState } from "react";

// Next
import Image from "next/image";
import Link from "next/link";

// React-Hook-Form
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

// React-Toastify
import { toast } from "react-toastify";

// Material-UI
import { Box, Container, Typography, TextField, IconButton, Divider, Button } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

// Icons
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import YoutubeIcon from "@material-ui/icons/YouTube";
import SendIcon from "@material-ui/icons/Send";

// GraphQL
import { useAddToNewsletterMutation } from "@Graphql/index";

// SSR
import withApollo from "@Apollo/ssr";

// =================================================================================================

type FormValues = {
  email: string;
};

const Footer = () => {
  const classes = useStyles();

  const [email, setEmail] = useState<string>("");

  const { register, errors, handleSubmit } = useForm<FormValues>({
    criteriaMode: "all",
  });

  const [addToNewsletter] = useAddToNewsletterMutation();

  const toaster = () => {
    toast.dark("Thank you for subscribing to our newsletter.", {
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
    const { data } = await addToNewsletter({
      variables: {
        email: form.email,
      },
    });

    setEmail("");

    await toaster();
  };

  return (
    <Box component={"footer"} boxShadow={3} className={classes.root}>
      <Container>
        <Box className={classes.footer}>
          <Box className={classes.footerHeader}>
            <Box>
              <Box className={classes.logo}>
                <Link href="/">
                  <Image width={40} height={40} src={"/raspberry.svg"} alt="Raspberry Pi Logo" />
                </Link>
                <Link href="/">
                  <Typography variant="h5" style={{ color: "white", marginLeft: "10px" }}>
                    BlueberryShop
                  </Typography>
                </Link>
              </Box>
              <Typography variant="body2" style={{ color: "white", margin: "20px 0px 0px 5px" }}>
                We sell everything, except you.
              </Typography>
            </Box>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
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
                  name={"email"}
                  as={<Typography style={{ color: "white", margin: "5px 0px 0px 3px" }} variant="body2" />}
                >
                  {({ messages }) =>
                    messages && Object.entries(messages).map(([type, message]) => <p key={type}>{message}</p>)
                  }
                </ErrorMessage>
              </Box>

              <Button type="submit" variant="contained" color="primary" className={classes.formSubmit}>
                <SendIcon style={{ color: "white" }} />
              </Button>
            </form>
          </Box>
        </Box>
        <Divider style={{ backgroundColor: "#b8b8b8" }} />

        <Box className={classes.footerContent}>
          <Box>
            <Typography variant="h6" style={{ color: "white", marginBottom: "20px" }}>
              Category
            </Typography>

            <Typography variant="body1" style={{ color: "white" }}>
              Products
            </Typography>

            <Typography variant="body1" style={{ color: "white" }}>
              Accessories
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" style={{ color: "white", marginBottom: "20px" }}>
              Links
            </Typography>

            <Typography variant="body1" style={{ color: "white" }}>
              Products
            </Typography>

            <Typography variant="body1" style={{ color: "white" }}>
              Accessories
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" style={{ color: "white", marginBottom: "20px" }}>
              Company
            </Typography>

            <Typography variant="body1" style={{ color: "white" }}>
              Careers
            </Typography>

            <Typography variant="body1" style={{ color: "white" }}>
              Contact
            </Typography>

            <Typography variant="body1" style={{ color: "white" }}>
              Legal
            </Typography>

            <Typography variant="body1" style={{ color: "white" }}>
              About
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" style={{ color: "white", marginBottom: "20px" }}>
              Community
            </Typography>

            <Typography variant="body1" style={{ color: "white" }}>
              Stories
            </Typography>

            <Typography variant="body1" style={{ color: "white" }}>
              Support
            </Typography>
          </Box>
        </Box>
        <Divider style={{ backgroundColor: "#b8b8b8" }} />
        <Box className={classes.footerCredentials}>
          <Typography variant="body2" style={{ color: "white" }}>
            &copy; {new Date().getFullYear()}, all rights reserved.
          </Typography>

          <Box>
            <IconButton>
              <FacebookIcon style={{ color: "white" }} />
            </IconButton>
            <IconButton>
              <InstagramIcon style={{ color: "white" }} />
            </IconButton>
            <IconButton>
              <TwitterIcon style={{ color: "white" }} />
            </IconButton>
            <IconButton>
              <YoutubeIcon style={{ color: "white" }} />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default withApollo({ ssr: true })(Footer);

// =================================================================

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: "calc(1% + 40px)",
      bottom: 0,
      backgroundColor: "#212121",
      boxShadow: "rgb(0 0 0 / 50%) 0px 0px 10px 0px",
    },

    footer: {
      height: "160px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },

    footerHeader: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },

    logo: {
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
    },

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

    footerContent: {
      display: "flex",
      justifyContent: "space-between",
      margin: "35px 0px",
    },
    footerCredentials: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
  }),
);
