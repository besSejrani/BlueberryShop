import React, { useState } from "react";

// Next
import { useRouter } from "next/router";

// React-Hook-Form
import { useForm } from "react-hook-form";

// Material-UI
import { Container, Paper, Box, Typography, Button, Divider } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";

// Components
import InputForm from "@Components/Form/InputForm/InputForm";
import DropDownCountries from "@Components/Form/DropDownCountries/DropDown";
import MultiStep from "@Components/Form/MultiStep/MultiStep";

// Hook
import useCalculateCartTotal from "@Hook/useCalculateCartTotal";

// GraphQl
import { useGetCartQuery } from "@Graphql/index";

// SSR
import withApollo from "@Apollo/ssr";

// Guard
import { withAuth } from "@Guard/withAuth";

// Apollo State
import { ui } from "@Apollo/state/ui/index";
import { checkout } from "@Apollo/state/checkout/index";

// ========================================================================================================

type FormValues = {
  amount: number;
};

const CheckoutShipping = () => {
  const classes = useStyles();

  const router = useRouter();

  // GraphQL
  const { data, loading } = useGetCartQuery();

  // Shipping State
  const [shippingCountry, setShippingCountry] = useState<string>("");
  const [shippingAddress, setShippingAddress] = useState<string>("");
  const [shippingCity, setShippingCity] = useState<string>("");
  const [shippingZip, setShippingZip] = useState<string>("");

  // Hook
  const { cartTotal } = useCalculateCartTotal(data?.getCart?.cart);

  // Form
  const { register, errors, handleSubmit } = useForm<FormValues>({
    criteriaMode: "all",
  });

  // Events
  const returnToCart = async () => {
    await router.back();
    await ui({ ...ui(), isCartOpen: true });
  };

  const onSubmit = async () => {
    await checkout({ ...checkout(), shippingAddress, shippingCity, shippingCountry, shippingZip });
    await router.push("/admin/checkout/payment");
  };

  if (loading) return <div>Loading ...</div>;

  return (
    <Container>
      <Paper elevation={3} className={classes.root}>
        <MultiStep first="Shipping" second="Payment" third="Done" />

        <Box className={classes.layout}>
          <Box className={classes.overview}>
            <Typography variant="h5">Shopping Cart</Typography>
            {data?.getCart?.cart.map((item) => (
              <Box key={item._id}>
                <Box
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 2fr 1fr",
                    gridGap: "1rem",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <img
                      src={item.productImageUrl || "/images/unknownProduct.png"}
                      alt={item.name}
                      width="110"
                      height="110"
                    />
                  </Box>

                  <Box style={{ display: "flex", alignItems: "center" }}>
                    <Box>
                      <Typography variant="body1" style={{ fontSize: "1.2rem" }}>
                        {item.name}
                      </Typography>
                      <Box style={{ display: "flex" }}>
                        <Typography variant="body2" style={{ fontSize: "0.9rem", fontWeight: 500 }}>
                          Quantity:
                        </Typography>
                        <Typography variant="body2" style={{ fontSize: "0.9rem", fontWeight: 500 }}>
                          1
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Typography variant="body1" style={{ justifySelf: "flex-end" }}>
                    {item.price}.-
                  </Typography>
                </Box>
              </Box>
            ))}

            <Divider />

            <Box style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body1" style={{ fontWeight: 500 }}>
                Cart Total
              </Typography>

              <Typography variant="body1" style={{ fontWeight: 500 }}>
                {cartTotal}.-
              </Typography>
            </Box>
          </Box>

          <Box>
            <Typography variant="h5">Shipping Address</Typography>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
              <Box className={classes.shipping}>
                <DropDownCountries
                  name="shippingCountry"
                  id="shippingCountry"
                  value={shippingCountry}
                  onChange={setShippingCountry}
                />

                <InputForm
                  type="text"
                  label="Address"
                  name="shippingAddress"
                  id="shippingAddress"
                  inputRef={register({
                    required: "This field is required",
                  })}
                  value={shippingAddress}
                  onChange={setShippingAddress}
                  errors={errors}
                />

                <InputForm
                  type="text"
                  label="City"
                  name="shippingCity"
                  id="shippingCity"
                  inputRef={register({
                    required: "This field is required",
                  })}
                  value={shippingCity}
                  onChange={setShippingCity}
                  errors={errors}
                />

                <InputForm
                  type="number"
                  label="Zip Code"
                  name="shippingZip"
                  id="shippingZip"
                  inputRef={register({
                    required: "This field is required",
                  })}
                  value={shippingZip}
                  onChange={setShippingZip}
                  errors={errors}
                />
              </Box>

              <Box style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button variant="outlined" color="primary" onClick={() => returnToCart()}>
                  Back to Cart
                </Button>
                <Button type="submit" variant="contained" color="primary" style={{ margin: "0px 0px 0px 20px" }}>
                  Continue to Payment
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default withApollo({ ssr: true })(withAuth(CheckoutShipping));

// =================================================================

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      borderRadius: 10,
      height: "100%",
      width: "100%",
    },
    layout: {
      display: "flex",
      justifyContent: "space-between",
      padding: "50px 70px 50px 70px",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      width: "450px",
    },
    shipping: {
      margin: "0px 0px 30px 0px",
      display: "flex",
      flexDirection: "column",
    },
    overview: {
      display: "grid",
      gridTemplateColumns: "1fr",
      gridGap: "1rem",
      width: "45%",
      flexDirection: "row",
    },
  }),
);
