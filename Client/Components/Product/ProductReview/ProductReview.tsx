import React from "react";

// Next
import Image from "next/image";

// Material-Ui
import { Card, Typography, Box, IconButton, Divider } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Rating } from "@material-ui/lab";

// Icons
import TuneIcon from "@material-ui/icons/Tune";

const ProductReview = ({ reviews }) => {
  const classes = useStyles();

  const renderReviews = () =>
    reviews?.getProductReviewPagination.reviews[0].reviews
      .map((review) => review.reviews)
      .map((reviews) => (
        <Box className={classes.review}>
          <Box className={classes.reviewInfo}>
            <Box style={{ margin: "0px 20px 0px 0px" }}>
              <Image
                width={50}
                height={50}
                className={classes.avatar}
                src="/images/unknown.png"
                title="tes"
                alt="test"
              />
            </Box>
            <Box>
              <Typography variant="body1">{reviews.reviewerName}</Typography>
              <Rating value={+reviews.rating} readOnly size="small" name="customized-color" precision={0.5} />
            </Box>
          </Box>
          <>
            <Typography variant="body1">{reviews.review}</Typography>
          </>
          <Divider style={{ margin: "20px 0px" }} />
        </Box>
      ));

  return (
    <Card style={{ backgroundColor: "white", borderRadius: 20, padding: "2rem 2rem 1rem 2rem", margin: "0px 0px" }}>
      <Box>
        <Box className={classes.reviewsHeader}>
          <Box>
            <Typography variant="h5">Reviews</Typography>
          </Box>
          <Box>
            <IconButton>
              <TuneIcon />
            </IconButton>
          </Box>
        </Box>
        <Divider />
        {renderReviews()}
      </Box>
    </Card>
  );
};

export default ProductReview;

// =================================================================

const useStyles = makeStyles(() =>
  createStyles({
    reviewsHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    review: {
      margin: "30px 0px",
    },
    reviewInfo: {
      display: "flex",
      margin: "0px 0px 10px 0px",
    },

    avatar: {
      borderRadius: "99px",
    },
  }),
);
