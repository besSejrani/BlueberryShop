import React, { useState } from "react";

// Next
import Link from "next/link";
import { useRouter } from "next/router";

// Material-Ui
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
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Rating, Pagination } from "@material-ui/lab";

// Icons
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";

// Components
import BackButton from "@Components/BackButon/BackButton";
import ProductImageSlider from "@Components/Product/ProductImageSlider/ProductImageSlider";
import ProductReview from "@Components/Product/ProductReview/ProductReview";
import WriteProductReview from "@Components/Product/WriteProductReview/WriteProductReview";

// GraphQL
import { useGetProductQuery, useGetProductReviewPaginationQuery } from "@Graphql/index";

// SSR
import withApollo from "@Apollo/ssr";

// HOC
import { withNoAuth } from "@Guard/withNoAuth";

// ========================================================================================================

const SingleProduct = (props) => {
  const classes = useStyles();
  const router = useRouter();
  const { query } = router;
  const { page = 1, size = 10 } = router.query;

  // State
  const [pageNumber, setPageNumber] = useState(+page);
  const [pageSize, setPageSize] = useState(+size);
  const [expanded, setExpanded] = useState<string | false>(false);

  // GraphQL
  const { data, loading } = useGetProductQuery({ variables: { productId: query.id as string } });
  const { data: reviews } = useGetProductReviewPaginationQuery({
    variables: { productId: query.id as string, pageNumber: pageNumber, pageSize: pageSize },
  });

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

      <WriteProductReview />

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

export default withApollo({ ssr: true })(withNoAuth(SingleProduct));

// =================================================================

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    accordions: {
      margin: "50px 0px 0px 0px",
    },
  }),
);
