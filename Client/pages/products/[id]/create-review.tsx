import React, { useState } from "react";

// Next
import { useRouter } from "next/router";

// React-Hook-Form
import { useForm } from "react-hook-form";

// Material-UI
import { Box, Button, Card, Typography } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

// Components
import InputForm from "@Components/InputForm/InputForm";

// GraphQL
import {} from "@Graphql/index";

// SSR
import withApollo from "@Apollo/ssr";

// ========================================================================================================

type FormValues = {
  reviewerName: string;
  rating: number;
  review: string;
};

const CreateReview = () => {
  const classes = useStyles();
  const router = useRouter();

  const { query } = router;

  // State
  const [reviewerName, setReviewerName] = useState<string>();
  const [rating, setRating] = useState<number>();
  const [review, setReview] = useState<string>();

  // Form
  const { register, errors, handleSubmit, control } = useForm<FormValues>({
    criteriaMode: "all",
  });

  //Events
  const onSubmit = (form) => {
    console.log(form);
  };

  return (
    <Box className={classes.root}>
      <Card className={classes.card}>
        <Box className={classes.content}>
          <Box>
            <Typography variant="h4" style={{ fontSize: "1.85rem" }}>
              Create Review
            </Typography>
          </Box>

          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <InputForm
              type="text"
              name="reviewerName"
              id="reviewerName"
              label="Username"
              inputRef={register({
                required: "This field is required",
              })}
              value={reviewerName}
              onChange={setReviewerName}
              errors={errors}
            />

            <InputForm
              type="number"
              name="rating"
              id="rating"
              label="Rating"
              inputRef={register({
                required: "This field is required",
                maxLength: { value: 1, message: "The product rating should contain maximum 1 digits" },
                min: { value: 1, message: "The product rating can not be less than 1" },
                max: { value: 5, message: "The product rating can not be higher than 5" },
              })}
              value={rating}
              onChange={setRating}
              errors={errors}
            />

            <InputForm
              type="text"
              name="review"
              id="review"
              label="Review"
              multiline
              rowsMax={"4"}
              inputRef={register({
                required: "This field is required",
                minLength: { value: 20, message: "The product description should contain minimum 20 characters" },
                maxLength: { value: 250, message: "The product description should contain maximum 250 characters" },
              })}
              value={review}
              onChange={setReview}
              errors={errors}
            />

            <Box style={{ flexDirection: "row", marginTop: "25px" }}>
              <Button variant="contained" color="secondary" type="submit">
                Create Review
              </Button>
            </Box>
          </form>
        </Box>
      </Card>
    </Box>
  );
};

export default withApollo({ ssr: true })(CreateReview);

// ========================================================================================================

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    card: {
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "400px",
      height: 300,
      borderRadius: "10px",
    },

    content: {
      flexDirection: "column",
      padding: "20px 20px",
    },

    form: {
      display: "flex",
      flexDirection: "column",
      margin: "0px 0px 0px 0px",
    },
  })
);
