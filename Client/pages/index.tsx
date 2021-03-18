import React, { useEffect } from "react";

// Redux
import { useDispatch } from "react-redux";
import { getItemCart } from "../Redux/product/productAction";

// Components
import Promotions from "../Components/Promotions/Promotions";

// SSR
import withApollo from "../Apollo/ssr"

// ========================================================================================================

const Home: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItemCart());
  });

  return (
    <>
      <Promotions />
    </>
  );
};

export default withApollo({ssr:true})(Home);

// =================================================================
