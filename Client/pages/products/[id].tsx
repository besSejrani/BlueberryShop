import React, { useState } from "react";

// Next
import Link from "next/link";
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
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Rating, Pagination } from "@material-ui/lab";

// Icons
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";

// Components
import InputForm from "@Components/InputForm/InputForm";
import BackButton from "@Components/BackButon/BackButton";
import ProductImageSlider from "@Components/Product/ProductImageSlider/ProductImageSlider";
import ProductReview from "@Components/Product/ProductReview/ProductReview";

// GraphQL
import {
  GetProductDocument,
  GetProductQuery,
  useGetProductQuery,
  useCreateProductReviewMutation,
  useGetProductReviewPaginationQuery,
} from "@Graphql/index";

// SSR
import withApollo from "@Apollo/ssr";

// ========================================================================================================

type FormValues = {
  reviewerName: string;
  rating: number;
  review: string;
};

const SingleProduct = () => {
  const classes = useStyles();
  const router = useRouter();
  const { query } = router;
  const { page = 1, size = 10 } = router.query;

  // State
  const [pageNumber, setPageNumber] = useState(+page);
  const [pageSize, setPageSize] = useState(+size);
  const [expanded, setExpanded] = useState<string | false>(false);
  const [reviewerName, setReviewerName] = useState<string>("");
  const [rating, setRating] = useState<number>(4);
  const [review, setReview] = useState<string>("");

  // GraphQL
  const { data, loading } = useGetProductQuery({ variables: { productId: query.id as string } });
  const { data: reviews } = useGetProductReviewPaginationQuery({
    variables: { productId: query.id as string, pageNumber: pageNumber, pageSize: pageSize },
  });
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

  const pages = Math.ceil(reviews?.getProductReviewPagination.count / pageSize);

  const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
    setPageNumber(value);

    router.push(`/products/${query.id}?page=${value}&size=${pageSize}`, ``, {
      shallow: true,
    });
  };

  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container component="section">
      <Card style={{ backgroundColor: "white", borderRadius: 20, padding: "2rem", margin: "50px 0px" }}>
        <Link href="/products">
          <BackButton />
        </Link>
        <Box>
          <Box className={classes.root}>
            <ProductImageSlider product={data?.getProduct} />

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

            <IconButton edge={"start"}>
              <FacebookIcon style={{ fontSize: "2rem" }} />
            </IconButton>
            <IconButton>
              <TwitterIcon style={{ fontSize: "2rem" }} />
            </IconButton>
            <IconButton>
              <WhatsAppIcon style={{ fontSize: "2rem" }} />
            </IconButton>
          </Box>
        </Box>
      </Card>

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

      <ProductReview reviews={reviews} />

      {pages ? (
        <Box className={classes.pagination}>
          <Pagination count={pages} color="primary" page={pageNumber} onChange={handleChangePagination} />
        </Box>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default withApollo({ ssr: true })(SingleProduct);

// =================================================================

const useStyles = makeStyles({
  root: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridGap: "2rem",
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
  content: {
    width: "500px",
    padding: "20px",
    borderRadius: "10px",
  },
  social: {
    margin: "50px 0px 0px 0px",
  },

  pagination: {
    margin: "60px 0px 0px 0px",
    "& > *": {
      marginTop: theme.spacing(2),
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
    margin: "0px 0px 20px 0px",
  },
  accordions: {
    margin: "50px 0px 0px 0px",
  },
});
