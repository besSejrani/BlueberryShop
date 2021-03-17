import React from "react";
// Auth
import { withAuth } from "../../../Guard/withAuth";

const index = ({ auth }) => {
  console.log(auth);
  return <div>promotions</div>;
};

export default withAuth(index);
