import React, { useState } from "react";

// Next
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

// React-Hook-Form
import { useForm } from "react-hook-form";

// Material-Ui
import theme from "../../Layout/Theme";
import {
  Button,
  Card,
  Typography,
  Container,
  Box,
  IconButton,
  MobileStepper,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  CardActionArea,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Rating, Pagination } from "@material-ui/lab";

// Icons
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";

// Libraries
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

// Components
import InputForm from "@Components/InputForm/InputForm";

// GraphQL
import { useGetProductQuery, useGetProductReviewsQuery, useCreateProductReviewMutation } from "@Graphql/index";

// SSR
import withApollo from "@Apollo/ssr";

// ========================================================================================================

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

type FormValues = {
  reviewerName: string;
  rating: number;
  review: string;
};

const SingleProduct = () => {
  const classes = useStyles();
  const router = useRouter();
  const { query } = router;

  // GraphQL
  const { data, loading } = useGetProductQuery({ variables: { productId: query.id as string } });
  const reviews = useGetProductReviewsQuery({ variables: { productId: query.id as string } });
  const [createProductReview] = useCreateProductReviewMutation();

  // State
  const [activeStep, setActiveStep] = useState(0);
  const [expanded, setExpanded] = useState<string | false>(false);
  const [reviewerName, setReviewerName] = useState<string>();
  const [rating, setRating] = useState<number>();
  const [review, setReview] = useState<string>();
  let maxSteps = data?.getProduct.productImages.length;

  // Form
  const { register, errors, handleSubmit, control } = useForm<FormValues>({
    criteriaMode: "all",
  });

  // Events
  const onSubmit = async (form) => {
    console.log(form);

    const { data } = await createProductReview({
      variables: {
        productId: query.id as string,
        rating: form.rating,
        review: form.review,
        username: form.reviewerName,
      },
    });
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const renderReviews = () => {
    return reviews.data?.getProductReviews.reviews.map((review) => {
      return (
        <Box className={classes.review}>
          <Box className={classes.reviewInfo}>
            <Box style={{ margin: "0px 20px 0px 0px" }}>
              <Image
                width={50}
                height={50}
                className={classes.avatar}
                src={`/static/images/unknown.png`}
                title={"tes"}
                alt={"test"}
              />
            </Box>
            <Box>
              <Typography variant="body1">{review.reviewerName}</Typography>

              <Rating
                value={review.rating}
                readOnly
                size="small"
                name="customized-color"
                defaultValue={2}
                precision={0.5}
              />
            </Box>
          </Box>
          <>
            <Typography variant="body1">{review.review}</Typography>
          </>

          <Divider style={{ marginTop: "10px" }} />
        </Box>
      );
    });
  };

  return (
    <Container component="section">
      <Card style={{ backgroundColor: "white", borderRadius: 20, padding: "2rem", margin: "50px 0px" }}>
        <Link href="/products">
          <Box className={classes.backButton}>
            <IconButton>
              <ArrowBackIcon color="primary" />
            </IconButton>
            <Typography variant="body1">Go Back</Typography>
          </Box>
        </Link>
        <Box>
          <Box className={classes.root}>
            <Card style={{ borderRadius: "10px" }}>
              <AutoPlaySwipeableViews
                interval={3500}
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
                style={{ width: "100%" }}
              >
                {data?.getProduct.productImages.map((product, index) => {
                  return (
                    <CardActionArea className={classes.area} key={index} disableRipple>
                      <Image
                        width={550}
                        height={400}
                        className={classes.media}
                        src={`${product}`}
                        title={product}
                        alt={product}
                      />
                    </CardActionArea>
                  );
                })}
              </AutoPlaySwipeableViews>
              <MobileStepper
                style={{ background: "none" }}
                steps={maxSteps}
                position="static"
                variant="dots"
                activeStep={activeStep}
                nextButton={
                  <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                    Next
                    {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                  </Button>
                }
                backButton={
                  <Button
                    size="small"
                    // onClick={handleBack}
                    disabled={activeStep === 0}
                  >
                    {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                    Back
                  </Button>
                }
              />
            </Card>

            <Box className={classes.product}>
              <Card className={classes.content}>
                <Box className={classes.productInfo}>
                  <Typography variant="h5">{data?.getProduct.name}</Typography>

                  <Typography variant="h6" color="secondary">
                    {data?.getProduct.price}.-
                  </Typography>
                </Box>

                <Box className={classes.productRating}>
                  <Rating value={3} readOnly size="medium" name="customized-color" defaultValue={2} precision={0.5} />
                  <Typography variant="body1" style={{ fontSize: "1.07rem", marginLeft: "7px" }}>
                    {550}
                  </Typography>
                </Box>

                <Typography variant="h6" className={classes.productStock}>
                  Stock: {data?.getProduct.stock}
                </Typography>

                {/* <Box>
              {selectProduct.options.map((option) => {
                return (
                  <Button variant="outlined" className={classes.productOptions}>
                  {option}
                  </Button>
                  );
                })}
              </Box> */}
                <Box className={classes.callToActions}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    onClick={() => console.log("hi")}
                    style={{ marginTop: "10px" }}
                  >
                    Add to Cart
                  </Button>

                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => console.log("hi")}
                    style={{ marginTop: "10px" }}
                  >
                    Buy Now
                  </Button>
                </Box>
              </Card>
            </Box>
          </Box>

          <Box className={classes.accordions}>
            <Accordion square defaultExpanded={true} onChange={handleChange("panel1")}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
                <Typography variant="body1">Description</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{data?.getProduct.description}</Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion onChange={handleChange("panel2")}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
                <Typography variant="body1">Specifications</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget maximus est, id
                  dignissim quam.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion onChange={handleChange("panel3")}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
                <Typography variant="body1">Returns & Waranty</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget maximus est, id
                  dignissim quam.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>

          <Box className={classes.social}>
            <Typography variant="h5">Share On Social Media</Typography>

            <IconButton>
              <FacebookIcon fontSize="large" />
            </IconButton>
            <IconButton>
              <TwitterIcon fontSize="large" />
            </IconButton>
            <IconButton>
              <WhatsAppIcon fontSize="large" />
            </IconButton>
          </Box>
        </Box>
      </Card>

      <Card style={{ backgroundColor: "white", borderRadius: 20, padding: "2rem 2rem 1rem 2rem", margin: "50px 0px" }}>
        <Box className={classes.formReview}>
          <Box>
            <Typography variant="h5" style={{ fontSize: "1.85rem" }}>
              Write a review
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
                Write Review
              </Button>
            </Box>
          </form>
        </Box>

        <Box className={classes.social}>
          <Typography variant="h5">Reviews</Typography>
          {renderReviews()}
        </Box>
      </Card>

      <Box className={classes.pagination}>
        <Pagination count={10} color="primary" />
      </Box>
    </Container>
  );
};

export default withApollo({ ssr: true })(SingleProduct);

// =================================================================

const useStyles = makeStyles({
  root: {
    display: "grid",
    gridTemplateColumns: "35% 1fr",
    gridGap: "2rem",
  },
  backButton: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  product: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  productInfo: {
    display: "flex",
    justifyContent: "space-between",
    margin: "4px 0px",
  },
  productRating: {
    display: "flex",
    alignItems: "center",
    margin: "4px 0px",
  },
  productStock: {
    margin: "4px 0px",
  },
  productOptions: {
    margin: "4px 0px",
  },
  callToActions: {
    margin: "20px 0px 0px 0px",
  },
  media: {
    height: "320px",
    width: "320px",
    marginRight: "100px",
  },
  area: {
    display: "flex",
    padding: "20px 20px 0px 20px",
    backgroundColor: "#fafafa",
  },
  content: {
    width: "500px",
    padding: "20px",
    borderRadius: "10px",
  },
  social: {
    margin: "50px 0px 0px 0px",
  },
  review: {
    margin: "30px 0px",
  },
  avatar: {
    borderRadius: "99px",
  },
  reviewInfo: {
    display: "flex",
    margin: "0px 0px 10px 0px",
  },

  pagination: {
    "& > *": {
      marginTop: theme.spacing(2),
      margin: "0px 0px 50px 0px",
      display: "flex",
      justifyContent: "center",
    },
  },
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "0px 0px 0px 0px",
  },
  formReview: {
    margin: "0px 0px 50px 0px",
  },
  accordions: {
    margin: "50px 0px 0px 0px",
  },
});
