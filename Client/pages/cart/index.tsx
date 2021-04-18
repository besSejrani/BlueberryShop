import React from "react";

// Material-UI
import { Card, Box } from "@material-ui/core";

// GraphQL
import { useGetCartQuery } from "@Graphql/index";

// SSR
import withApollo from "@Apollo/ssr";

// HOC
import { withAuth } from "@Guard/withAuth";

// ========================================================================================================
const CartProducts = () => {
  let token;

  if (typeof window !== "undefined") {
    token = window.localStorage.getItem("token");
  }

  const { data, loading } = useGetCartQuery();

  // const { data, loading } = useGetCartQuery({
  //   context: {
  //     headers: {
  //       token:
  //         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDc1M2ExM2QyOTA5YTgxMzVhNmNhMjgiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MTg3MTMwMzYsImV4cCI6MTYxODc5OTQzNn0.VM26orYFUM2rWm2V1mTal1y4RuRg7rLUmnPbikcIXsw",
  //     },
  //   },
  // });

  if (loading) return <div>loading...</div>;

  return (
    <Card>
      <h1>Cart</h1>
      {data?.getCart?.cart.map((product) => {
        return (
          <Box key={product._id}>
            <img src={product.productImageUrl} width={100} height={100} />
            <Box>{product.name}</Box>
            <Box>{product.description}</Box>
            <Box>{product.price}</Box>
            <Box>{product.stock}</Box>
          </Box>
        );
      })}
    </Card>
  );
};

export default withApollo({ ssr: true })(withAuth(CartProducts));
