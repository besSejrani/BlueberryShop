import { makeVar } from "@apollo/client";

const initialState = {
  shippingCountry: "",
  shippingAddress: "",
  shippingCity: "",
  shippingZip: "",

  billingCountry: "",
  billingAddress: "",
  billingCity: "",
  billingZip: "",

  couponCode: "",
};

type Checkout = {
  shippingCountry: string;
  shippingAddress: string;
  shippingCity: string;
  shippingZip: string;

  billingCountry: string;
  billingAddress: string;
  billingCity: string;
  billingZip: string;

  couponCode: string;
};

export const checkout = makeVar<Checkout>(initialState);
