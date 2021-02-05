import React from "react";

import { connect } from "react-redux";
import { increment, remove, decrement } from "../../Redux/product/actions";

import TrashIcon from "@material-ui/icons/Delete";
import UpIcon from "@material-ui/icons/ArrowUpward";
import DownIcon from "@material-ui/icons/ArrowDownward";

const CartItem = ({ cartItem, increment, decrement, remove }) => {
  const { id, image, title, price, count, total } = cartItem;
  return (
    <div className="row mt-5 mt-lg-0 text-capitalize text-center align-items-center">
      <div className="col-10 mx-auto col-lg-2 pb-2">
        <img src={image} alt="product" width="80" className="img-fluid" />
      </div>

      <div className="col-10 mx-auto col-lg-2 pb-2">
        <h6 style={{ fontWeight: 600 }}>{title}</h6>
      </div>

      <div className="col-10 mx-auto col-lg-2 pb-2">
        <h6 style={{ fontWeight: 600 }}>{price} CHF</h6>
      </div>

      <div className="col-10 mx-auto col-lg-2 my-2 pb-2 my-lg-0">
        <div className="d-flex justify-content-center">
          <div>
            <DownIcon
              className="cart-icon text-primary"
              onClick={() => decrement(id)}
            />

            <span
              style={{ fontWeight: 600 }}
              className="text-title text-muted mx-3"
            >
              {count}
            </span>

            <UpIcon
              className="cart-icon text-primary"
              onClick={() => increment(id)}
            />
          </div>
        </div>
      </div>

      <div className="col-10 mx-auto col-lg-2 pb-2">
        <h6 style={{ fontWeight: 600 }}>
          {
            <TrashIcon
              className="text-danger cart-icon"
              onClick={() => remove(id)}
            />
          }
        </h6>
      </div>

      <div className="col-10 mx-auto col-lg-2 pb-2">
        <h6 style={{ fontWeight: 600 }} className="text-muted">
          Total: {total} CHF
        </h6>
      </div>
    </div>
  );
};

export default connect(null, { increment, remove, decrement })(CartItem);
