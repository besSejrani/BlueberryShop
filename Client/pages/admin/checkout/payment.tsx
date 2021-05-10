import React, { useState } from "react";

// Next
import { useRouter } from "next/router";

// React-Hook-Form
import { useForm } from "react-hook-form";

// Material-UI
import {
  Paper,
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";

// Components
import InputForm from "@Components/Form/InputForm/InputForm";
import DropDownCountries from "@Components/Form/DropDownCountries/DropDown";

// Hook
import useCalculateCartTotal from "@Hook/useCalculateCartTotal";

// Stripe
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

// GraphQl
import { CreateStripePaymentIntentDocument, useGetCartQuery } from "@Graphql/index";

// SSR
import withApollo, { apolloClient } from "@Apollo/ssr";

// Guard
import { withAuth } from "@Guard/withAuth";

// ========================================================================================================

type FormValues = {
  amount: number;
};

const CheckoutPayment = () => {
  const classes = useStyles();

  const router = useRouter();

  // GraphQL
  const { data, loading } = useGetCartQuery();

  // Hook
  const { cartTotal, stripeTotal } = useCalculateCartTotal(data?.getCart?.cart);

  // Stripe
  const stripe = useStripe();
  const elements = useElements();

  // Billing State
  const [billingCountry, setBillingCountry] = useState<string>("");
  const [billingAddress, setBillingAddress] = useState<string>("");
  const [billingCity, setBillingCity] = useState<string>("");
  const [billingZip, setBillingZip] = useState<string>("");

  // Shipping State
  const [shippingCountry, setShippingCountry] = useState<string>("");
  const [shippingAddress, setShippingAddress] = useState<string>("");
  const [shippingCity, setShippingCity] = useState<string>("");
  const [shippingZip, setShippingZip] = useState<string>("");

  // Form
  const { register, errors, handleSubmit } = useForm<FormValues>({
    criteriaMode: "all",
  });

  // Stripe options
  const cardElementOption = {
    hidePostalCode: true,
    style: iframeStyles,
  };

  // Events
  const onSubmit = async () => {
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement("card");

    const billingDetails = {
      name: "Besjan Sejrani",
      email: "besjan.sejrani@cpnv.ch",

      address: {
        country: "ch",
        city: billingCity,
        line1: billingAddress,
        postal_code: billingZip,
      },
    };

    const paymentMethodReq = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: billingDetails,
    });

    const { data: clientSecret } = await apolloClient?.mutate({
      mutation: CreateStripePaymentIntentDocument,
      variables: { amount: stripeTotal },
    });

    await stripe.confirmCardPayment(clientSecret?.createStripePaymentIntent, {
      payment_method: paymentMethodReq.paymentMethod.id,
    });

    router.push("/products");
  };

  if (loading) return <div>Loading ...</div>;

  console.log(billingCountry);

  return (
    <Paper elevation={3} className={classes.root}>
      <Typography variant="h5">Checkout</Typography>

      <Box className={classes.layout}>
        <Box>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <Box className={classes.shipping}>
              <Typography variant="h5">Shipping</Typography>

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
                label="Zip"
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

            <Box className={classes.billing}>
              <Typography variant="h5">Billing</Typography>

              <DropDownCountries
                name="billingCountry"
                id="billingCountry"
                value={billingCountry}
                onChange={setBillingCountry}
              />

              {console.log(billingCountry)}

              <InputForm
                type="text"
                label="Address"
                name="billingAddress"
                id="billingAddress"
                inputRef={register({
                  required: "This field is required",
                })}
                value={billingAddress}
                onChange={setBillingAddress}
                errors={errors}
              />

              <InputForm
                type="text"
                label="City"
                name="billingCity"
                id="billingCity"
                inputRef={register({
                  required: "This field is required",
                })}
                value={billingCity}
                onChange={setBillingCity}
                errors={errors}
              />

              <InputForm
                type="number"
                label="Zip"
                name="billingZip"
                id="billingZip"
                inputRef={register({
                  required: "This field is required",
                })}
                value={billingZip}
                onChange={setBillingZip}
                errors={errors}
              />
            </Box>

            <Box className={classes.cardElements}>
              <CardElement options={cardElementOption} />
            </Box>

            <Button className={classes.pay} variant="contained" color="secondary" type="submit">
              <Typography variant="body1">Pay {cartTotal}</Typography>
            </Button>
          </form>
        </Box>
        <Box>hello</Box>
      </Box>
      <Box className={classes.overview}>
        <Typography variant="h5">Order Overview</Typography>

        <TableContainer
          component={Paper}
          className={classes.overview}
          elevation={2}
          style={{ width: "70%", height: 455, margin: "30px 0px 0px 0px" }}
        >
          <Table aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="body1">Product</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body1">Quantity</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body1">Price</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body1">Total</Typography>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data?.getCart?.cart.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>
                    <Box style={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={item.productImageUrl || "/images/unknownProduct.png"}
                        alt={item.name}
                        width="100"
                        height="100"
                      />
                      <Typography variant="body1">{item.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="left">{1}</TableCell>
                  <TableCell align="center">{item.price}</TableCell>
                  <TableCell align="right">{item.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="outlined" color="primary" onClick={() => router.back()}>
          Back to Shipping
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{ margin: "0px 0px 0px 20px" }}
          onClick={() => router.push("/admin/checkout/done")}
        >
          Confirm Payment
        </Button>
      </Box>
    </Paper>
  );
};

export default withApollo({ ssr: true })(withAuth(CheckoutPayment));

// =================================================================

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      borderRadius: 10,
      height: "100%",
    },
    layout: {
      display: "flex",
      justifyContent: "space-between",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      margin: "50px 50px",
      width: 700,
    },
    shipping: {
      margin: "30px 0px",
      display: "flex",
      flexDirection: "column",
    },
    billing: {
      margin: "30px 0px",
      display: "flex",
      flexDirection: "column",
    },
    overview: {
      padding: "50px 50px",
    },
    cardElements: {
      border: "1px solid rgba(33, 33, 33, 0.5)",
      padding: 20,
      borderRadius: 6,
    },
    pay: {
      marginTop: 30,
    },
  }),
);

// Stripe Card Element Style
const iframeStyles = {
  base: {
    fontSize: "16px",
  },
  invalid: {},
  complete: {},
};
