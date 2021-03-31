import React, { useState } from "react";

// Next
import { useRouter } from "next/router";

// React-Hook-Form
import { useForm } from "react-hook-form";

// Material-Ui
import { Button, Card, Typography, Box } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Rating } from "@material-ui/lab";

// Components
import InputForm from "@Components/InputForm/InputForm";

// GraphQL
import { GetProductDocument, GetProductQuery, useCreateProductReviewMutation } from "@Graphql/index";

// ========================================================================================================

type FormValues = {
  reviewerName: string;
  rating: number;
  review: string;
};

const WriteReview = () => {
  const classes = useStyles();
  const router = useRouter();
  const { query } = router;

  // State
  const [reviewerName, setReviewerName] = useState<string>("");
  const [rating, setRating] = useState<number>(4);
  const [review, setReview] = useState<string>("");

  // GraphQL
  const [createProductReview] = useCreateProductReviewMutation();

  // Form
  const { register, errors, handleSubmit, control } = useForm<FormValues>({
    criteriaMode: "all",
  });

  // Events
  const onSubmit = async (form) => {
    await createProductReview({
      variables: {
        productId: query.id as string,
        rating: `${rating}`,
        review: form.review,
        username: form.reviewerName,
      },
      update(cache, { data }) {
        const newReview = data?.createProductReview;

        const product: GetProductQuery = cache.readQuery({
          variables: { productId: query.id as string },
          query: GetProductDocument,
        });

        cache.writeQuery({
          query: GetProductDocument,
          data: {
            getProduct: [...product.getProduct.reviews, newReview],
          },
        });
      },
    });

    setReview("");
    setReviewerName("");
    setRating(4);
  };

  return (
    <Card
      style={{
        backgroundColor: "white",
        borderRadius: 20,
        padding: "2rem 2rem 1rem 2rem",
        margin: "0px 0px 50px 0px",
      }}
    >
      <Box className={classes.formReview}>
        <Box>
          <Typography variant="h5">Write a review</Typography>
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

          <Box component="fieldset" mb={3} borderColor="transparent" style={{ margin: "20px 0px 0px 0px" }}>
            <Typography component="legend" style={{ margin: "0px 0px 10px 0px" }}>
              Rating
            </Typography>
            <Rating
              name="rating"
              precision={0.5}
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />
          </Box>

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
              Write Review
            </Button>
          </Box>
        </form>
      </Box>
    </Card>
  );
};

export default WriteReview;

// ========================================================================================================

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      display: "flex",
      flexDirection: "column",
      margin: "0px 0px 0px 0px",
    },
    formReview: {
      margin: "0px 0px 20px 0px",
    },
  })
);
