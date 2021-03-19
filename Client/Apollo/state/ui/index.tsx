import { makeVar } from "@apollo/client";

const initialState = {
  isAdmin: true,
  isUser: false,
  isSideBarOpen: false,
  isCartOpen: false,
  isToastrOpen: false,
};

type UI = {
  isAdmin?: boolean;
  isUser?: boolean;
  isSideBarOpen?: boolean;
  isCartOpen?: boolean;
  isToastrOpen: boolean;
};

export const ui = makeVar<UI>(initialState);
