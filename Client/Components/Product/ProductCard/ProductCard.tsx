import React from "react";

// Next
import Link from "next/link";
import Image from "next/image";

// Material-UI
import { Box, Button, Card, CardActionArea, CardActions, CardContent, makeStyles, Typography } from "@material-ui/core";
import { Skeleton, Rating } from "@material-ui/lab";
import { withStyles } from "@material-ui/core/styles";

// Icons
import AddIcon from "@material-ui/icons/Add";

// ========================================================================================================

type IProduct = {
  product: {
    _id: string;
    name: string;
    price: number;
    description: string;
    stock: number;
    promotion: boolean;
    productImages: string[];
    // rating?: number;
    // reviews?: string[];
    // imageUrl?: any;
    // company?: string;
  };
};

const Product: React.FC<IProduct> = ({ product }, loading: boolean) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      {loading ? (
        <CardActionArea className={classes.area}>
          <Link href="/products/[id]" as={`/products/${product._id}`} passHref>
            <Image
              width={300}
              height={250}
              onClick={() => console.log(product._id)}
              src={product.productImages[0] || `/static/images/unknownProduct.png`}
              title={product.name}
            />
          </Link>
        </CardActionArea>
      ) : (
        <Skeleton variant="rect" animation="wave" width={320} height={253} />
      )}

      <CardContent className={classes.content}>
        <div className={classes.titlePrice}>
          <Typography variant="h6" component="h2" className={classes.title}>
            {product.name}
          </Typography>

          <Typography variant="h6" color="secondary" className={classes.price}>
            {product.price}.-
          </Typography>
        </div>

        {loading ? (
          <Box style={{ maxWidth: 280, height: "60px", wordWrap: "break-word" }}>
            <Typography variant="body2">{product?.description.split("", 110).concat("...")}</Typography>
          </Box>
        ) : (
          <Skeleton variant="rect" animation="wave" width={280} height={60} style={{ marginTop: "5px" }} />
        )}
      </CardContent>

      <CardActions className={classes.actions}>
        {loading ? (
          <div className={classes.rating}>
            <StyledRating
              // value={product.rating}
              value={5}
              readOnly
              size="small"
              name="customized-color"
              defaultValue={2}
              precision={0.5}
            />
          </div>
        ) : (
          <Skeleton variant="rect" animation="wave" width={90} height={18} />
        )}

        {loading ? (
          <Button
            size="small"
            onClick={() => console.log(product._id)}
            title="Add to cart"
            color="secondary"
            variant="outlined"
            startIcon={<AddIcon fontSize={"small"} />}
          >
            Add to Cart
          </Button>
        ) : (
          <Skeleton variant="rect" animation="wave" width={130} height={30} />
        )}
      </CardActions>
    </Card>
  );
};

export default Product;

// =================================================================

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",

    width: "320px",
    height: "465px",

    borderRadius: 10,
  },
  area: {
    display: "flex",
    padding: "20px 20px 20px 20px",
    backgroundColor: "#ffffff",
  },
  content: {
    padding: "20px",
    width: "280px",
  },
  titlePrice: {
    display: "flex",
    justifyContent: "space-between",
  },
  title: {
    width: "100%",
    minHeight: "45px",
    fontSize: "1.15rem",
  },
  price: {
    fontSize: "1.15rem",
  },
  rating: {
    display: "flex",
    alignItems: "center",
  },
  ratingReview: {
    margin: "0px 0px 0px 3px",
    fontSize: "0.85rem",
  },
  actions: {
    padding: "0px 20px",
    display: "flex",
    justifyContent: "space-between",
  },
});

// =================================================================

const StyledRating = withStyles({
  iconFilled: {
    // color: 'blue',
  },
  iconHover: {
    color: "#ff3d47",
  },
})(Rating);
