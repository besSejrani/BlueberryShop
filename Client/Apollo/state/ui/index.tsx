import { makeVar } from "@apollo/client";

const initialState = {
  isAdmin: false,
  isUser: false,
  isSideBarOpen: false,
  isCartOpen: false,
};

type UI = {
  isAdmin?: boolean;
  isUser?: boolean;
  isSideBarOpen?: boolean;
  isCartOpen?: boolean;
};

export const ui = makeVar<UI>(initialState);
