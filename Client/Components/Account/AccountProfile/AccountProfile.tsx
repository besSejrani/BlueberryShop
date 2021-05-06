import React, { useState, useEffect } from "react";

// React-Hook-Form
import { useForm } from "react-hook-form";

// Material-UI
import { Box, Typography, Button, Divider } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";

// Components
import InputForm from "@Components/Form/InputForm/InputForm";
import UploadFile from "@Components/UploadFile/UploadFile";

// Hooks
import useToast from "@Hook/useToast";

// GraphQL
import { useGetUserQuery, useUpdateProfileMutation } from "@Graphql/index";

// Apollo State
import { useReactiveVar } from "@apollo/client";
import { user } from "@Apollo/state/user/index";
import { product } from "@Apollo/state/product/index";

// Guard
import { withAuth } from "@Guard/withAuth";

// Icons
import PersonIcon from "@material-ui/icons/Person";
import CreateIcon from "@material-ui/icons/Create";

// =================================================================================================

const Account = () => {
  const classes = useStyles();

  // Apollo State
  const account = useReactiveVar(product);

  // GraphQL
  const { data, loading } = useGetUserQuery({ variables: { userId: user()._id } });
  const [updateProfile] = useUpdateProfileMutation();

  // Profile State
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setUsername(data?.getUser.username);
    setEmail(data?.getUser.email);
  }, [data]);

  // Form
  const { register, errors, handleSubmit } = useForm({
    criteriaMode: "all",
  });

  // Events
  const onSubmitProfile = async (form) => {
    await updateProfile({ variables: { picture: account.images[0], email: form.email, username: form.username } });

    const profileImageUrl = account.preview[0];

    user({
      _id: user()._id,
      username: form.username,
      role: user().role,
      profileImageUrl: !profileImageUrl ? user().profileImageUrl : profileImageUrl,
    });

    useToast({ message: "Your profile informations where modified", color: "#00ff00" });
  };

  if (loading) return <div>loading...</div>;

  return (
    <>
      <Box id="profile">
        <Typography variant="h2" style={{ scrollPadding: "30px 0px 0px 0px" }}>
          Profile
        </Typography>

        <Box className={classes.profileImage}>
          {user().profileImageUrl ? (
            <img src={user().profileImageUrl} className={classes.profileImage} alt="" />
          ) : (
            <PersonIcon
              style={{
                color: "white",
                borderRadius: 120,
                fontSize: "200px",
                backgroundColor: "grey",
                padding: "3px",
              }}
            />
          )}

          <Box className={classes.uploadbutton}>
            <UploadFile name="" filesLimit={1}>
              <CreateIcon />
            </UploadFile>
          </Box>
        </Box>

        <form className={classes.form} onSubmit={handleSubmit(onSubmitProfile)}>
          <InputForm
            type="text"
            label="Username"
            name="username"
            id="username"
            inputRef={register({
              required: "This field is required",
            })}
            value={username}
            onChange={setUsername}
            errors={errors}
          />

          <InputForm
            type="email"
            label="Email"
            name="email"
            id="email"
            inputRef={register({
              required: "This field is required",
            })}
            value={email}
            onChange={setEmail}
            errors={errors}
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
    </>
  );
};

export default withAuth(Account);

// =================================================================================================

const useStyles = makeStyles(() =>
  createStyles({
    profileImage: {
      position: "relative",
      borderRadius: 150,
      cursor: "pointer",
      width: 200,
      height: 200,
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
  }),
);
