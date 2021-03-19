import React from "react";

//React Hook Form
import { useForm } from "react-hook-form";

// Material-UI
import { Box, Button } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";



// Apollo
import { useAddProfilePictureMutation } from "../../../Graphql/index";

// Apollo State
import withApollo from "../../../Apollo/ssr";

// ========================================================================================================

const index = () => {
  const classes = useStyles();

  const { register, errors, handleSubmit } = useForm({
    criteriaMode: "all",
  });

  const [useAddProfilePicture] = useAddProfilePictureMutation();

  const onSubmit = async (form) => {
    console.log(form);
    await useAddProfilePicture({
      variables: {
        picture: form.picture[0],
      },
    });
  };

  return (
    <Box className={classes.root}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="file" name="picture" ref={register} />

        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default withApollo({ssr:true})(index)

// ========================================================================================================

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    },
  })
);
