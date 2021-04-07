import { makeVar } from "@apollo/client";

const initialState = {
  _id: "",
  username: "",
  role: "user",
  profileImageUrl: "",
};

type User = {
  _id?: string;
  username?: string;
  role?: string;
  profileImageUrl?: string;
};

export const user = makeVar<User>(initialState);
