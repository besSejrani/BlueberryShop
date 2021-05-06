import React from "react";

// Material-UI
import { Card, Box } from "@material-ui/core";

// GraphQL
import { useGetCartQuery } from "@Graphql/index";

// SSR
import withApollo from "@Apollo/ssr";

// Guard
import { withAuth } from "@Guard/withAuth";

// ========================================================================================================
const CartProducts = () => {
  const { data, loading } = useGetCartQuery();

  // const { data, loading } = useGetCartQuery({
  //   context: {
  //     headers: {
  //       token:
  //         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDc1M2ExM2QyOTA5YTgxMzVhNmNhMjgiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MjAyMjIzMjksImV4cCI6MTYyMDMwODcyOX0.FWDaj51VtZoN_W0WPp-Ezu7JdKjpunPrvMuFuh_6ZQ0",
  //     },
  //   },
  // });

  console.log("cart", data);

  if (loading) return <div>loading...</div>;

  return (
    <Card>
      <h1>Cart</h1>
      {data?.getCart?.cart.map((product) => (
        <Box key={product._id}>
          <img src={product.productImageUrl} width={100} height={100} alt="" />
          <Box>{product.name}</Box>
          <Box>{product.description}</Box>
          <Box>{product.price}</Box>
          <Box>{product.stock}</Box>
        </Box>
      ))}
    </Card>
  );
};

export default withApollo({ ssr: true })(withAuth(CartProducts));
