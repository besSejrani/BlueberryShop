import { makeVar } from "@apollo/client";

const initialState = {
  content: "",
};

type Markdown = {
  content: string | undefined;
};

export const markdown = makeVar<Markdown>(initialState);
