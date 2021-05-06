import React from "react";

// Next
import Link from "next/link";

// Material-UI
import { Drawer, Divider, Button, Typography, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// Icons
import DeleteIcon from "@material-ui/icons/Delete";

// Hooks
import useCalculateCartTotal from "@Hook/useCalculateCartTotal";

// GraphQL
import { useGetCartQuery, useDeleteProductFromCartMutation } from "@Graphql/index";

// Apollo State
import { useReactiveVar } from "@apollo/client";
import { ui } from "@Apollo/state/ui/index";

// SSR
import withApollo from "@Apollo/ssr";

// Guard
import { withAuth } from "@Guard/withAuth";
// ========================================================================================================

type Anchor = "right";

const SideDrawerCart: React.FC = () => {
  const classes = useStyles();

  // GraphQL
  const { data } = useGetCartQuery();
  const [deleteProductFromCart] = useDeleteProductFromCartMutation();

  const deleteProductCart = async (id) => {
    await deleteProductFromCart({ variables: { productId: id } });
  };

  // Hook
  const { cartTotal } = useCalculateCartTotal(data?.getCart?.cart);

  const changeCart = () => {
    ui({ isCartOpen: false });
  };
  const cart = useReactiveVar(ui);

  const list = (anchor: Anchor) => (
    <div className={classes.list}>
      <div className={classes.listProduct}>
        {data?.getCart?.cart.map((item) => (
          <div key={item._id} className={classes.product}>
            <Link href={`/products/${item._id}`}>
              <img src={item.productImageUrl || "/images/unknownProduct.png"} width={100} height={100} alt="" />
            </Link>

            <div className={classes.information}>
              <Typography variant="body1">{item.name}</Typography>
              <Button
                disabled
                variant="outlined"
                className={classes.actionButton}
                onClick={() => console.log(item._id)}
              >
                -
              </Button>
              <Button disabled variant="outlined" className={classes.actionButton}>
                {1}
              </Button>
              <Button
                disabled
                variant="outlined"
                className={classes.actionButton}
                onClick={() => console.log(item._id)}
              >
                +
              </Button>

              <IconButton onClick={() => deleteProductCart(item._id)}>
                <DeleteIcon />
              </IconButton>

              <Typography variant="body2" color="secondary" className={classes.priceProduct}>
                {item.price}.-
              </Typography>
            </div>
          </div>
        ))}
      </div>
      <div>
        <div className={classes.amount}>
          <Typography variant="body1">Cart Total</Typography>
          <Typography variant="subtitle2" color="secondary">
            {cartTotal}.-
          </Typography>
        </div>

        <Divider />
        <Link href="/checkout" passHref>
          <Button variant="contained" size="large" color="secondary" className={classes.checkout}>
            Checkout
          </Button>
        </Link>

        <Button
          variant="outlined"
          size="large"
          color="primary"
          className={classes.clearCart}
          onClick={() => console.log("clear")}
        >
          Clear Cart
        </Button>

        <Divider />
      </div>
    </div>
  );

  return (
    <div>
      {(["right"] as Anchor[]).map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer anchor={anchor} open={cart.isCartOpen} onClose={() => changeCart()}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default withApollo({ ssr: true })(withAuth(SideDrawerCart));

// =================================================================

const useStyles = makeStyles(() => ({
  list: {
    width: 380,
    overflow: "auto",
    overflowX: "hidden",
  },
  listProduct: {
    maxHeight: "75%",
    overflow: "auto",
  },
  product: {
    display: "flex",
    alignItems: "center",
    margin: "30px 20px",
  },
  information: {
    marginLeft: 20,
    width: "60%",
    position: "relative",
  },
  priceProduct: {
    position: "absolute",
    top: "42px",
    right: "-7px",
  },
  actionButton: {
    minWidth: "40px",
    marginTop: "10px",
    padding: 5,
  },
  media: {
    height: "110px",
    width: "110px",
  },
  amount: {
    margin: "50px 20px 10px 20px",
    display: "flex",
    justifyContent: "space-between",
  },
  checkout: {
    margin: "20px 20px 10px 20px",
    width: "90%",
  },

  clearCart: {
    margin: "10px 20px 20px 20px",
    width: "90%",
  },
}));
