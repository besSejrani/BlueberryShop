import React from "react";
import Link from "next/link";

// Material-UI
import { Button, Container, makeStyles } from "@material-ui/core";

// Apollo
import { useGetProductsQuery } from "@Graphql/index";

// Components
import Card from "../Product/ProductCard/ProductCard";

// ========================================================================================================

const Promotions = () => {
  const classes = useStyles();

  const { data, loading } = useGetProductsQuery();

  if (loading) return <div>loading ...</div>;

  return (
    <Container>
      <section className={classes.root}>
        {data?.getProducts.products.map((product) => {
          if (product.status === "PUBLISHED") {
            return <Card key={product._id} product={product} />;
          }
        })}
      </section>

      <div className="col text-center">
        <Link href="/products" passHref>
          <Button variant="outlined" className="main-link" style={{ marginTop: "30px" }}>
            Our products
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default Promotions;

// =================================================================

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    margin: "200px 0px 50px 0px",
  },
});
