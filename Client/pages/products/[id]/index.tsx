import React from "react";

// Next
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

// Material-Ui
import theme from "../../../Layout/Theme";
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

// GraphQL
import { useGetProductQuery } from "@Graphql/index";

// SSR
import withApollo from "@Apollo/ssr";

// ========================================================================================================

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const SingleProduct = () => {
  const classes = useStyles();
  const router = useRouter();
  const { query } = router;

  // GraphQL
  const { data, loading } = useGetProductQuery({ variables: { productId: query.id as string } });

  // State
  const [activeStep, setActiveStep] = React.useState(0);
  const [expanded, setExpanded] = React.useState<string | false>(false);
  let maxSteps = data?.getProduct.productImages.length;

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
    const reviews = [
      {
        name: "Mark",
        rating: 2,
        review:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium deserunt assumenda, exercitationem accusamus debitis repellat est ipsam, nostrum culpa id cum deleniti illo facilis rerum quisquam ipsum praesentium sunt! Eos.",
      },
      {
        name: "Sandra",
        rating: 3,
        review:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium deserunt assumenda, exercitationem accusamus debitis repellat est ipsam, nostrum culpa id cum deleniti illo facilis rerum quisquam ipsum praesentium sunt! Eos.",
      },
      {
        name: "Pietro",
        rating: 4,
        review:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium deserunt assumenda, exercitationem accusamus debitis repellat est ipsam, nostrum culpa id cum deleniti illo facilis rerum quisquam ipsum praesentium sunt! Eos.",
      },
      {
        name: "Hasan",
        rating: 2,
        review:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium deserunt assumenda, exercitationem accusamus debitis repellat est ipsam, nostrum culpa id cum deleniti illo facilis rerum quisquam ipsum praesentium sunt! Eos.",
      },
      {
        name: "Ingrid",
        rating: 3,
        review:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium deserunt assumenda, exercitationem accusamus debitis repellat est ipsam, nostrum culpa id cum deleniti illo facilis rerum quisquam ipsum praesentium sunt! Eos.",
      },
      {
        name: "Super",
        rating: 4,
        review:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium deserunt assumenda, exercitationem accusamus debitis repellat est ipsam, nostrum culpa id cum deleniti illo facilis rerum quisquam ipsum praesentium sunt! Eos.",
      },
    ];

    return reviews.map((reviews) => {
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
              <Typography variant="body1">{reviews.name}</Typography>

              <Rating
                value={reviews.rating}
                readOnly
                size="small"
                name="customized-color"
                defaultValue={2}
                precision={0.5}
              />
            </Box>
          </Box>
          <>
            <Typography variant="body1">{reviews.review}</Typography>
          </>

          <Divider style={{ marginTop: "10px" }} />
        </Box>
      );
    });
  };

  return (
    <Container component="section">
      <Box style={{ backgroundColor: "white", borderRadius: 20, padding: "2rem", margin: "50px 0px" }}>
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

          <Box className={classes.social} style={{ margin: "50px 0px" }}>
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

          <Box className={classes.social}>
            <Typography variant="h5">Reviews</Typography>
            {renderReviews()}
          </Box>
        </Box>
      </Box>
      <div className={classes.pagination}>
        <Pagination count={10} color="primary" />
      </div>
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
    margin: "00px 0px",
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
});
