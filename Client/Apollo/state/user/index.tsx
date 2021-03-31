import { makeVar } from "@apollo/client";

const initialState = {
  _id: "",
  username: "",
  role: "",
};

type Product = {
  _id: string;
  username: string;
  role: string;
};

export const product = makeVar<Product>(initialState);
