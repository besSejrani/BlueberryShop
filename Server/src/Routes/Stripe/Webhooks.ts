// Express
import express from "express";

// Database
import { UserModel } from "@Model/user/User";
import { OrderModel } from "@Model/Order";

// UUID
import { v4 as uuid } from "uuid";

// Logger
import logger from "@Logger/index";

// ========================================================================================================

const router = express.Router();

router.post("/webhook", async (req, res) => {
  let paymentIntent;

  // Handle the event
  switch (req.body.type) {
    case "payment_intent.succeeded":
      paymentIntent = req.body.data.object;

      const orderNumber = `${uuid()}`;
      const invoiceNumber = `${uuid()}`;

      // Find corresponding user
      const user = await UserModel.findById({ _id: paymentIntent.metadata.user });
      const amount = parseInt(paymentIntent.amount) / 100;

      // Save user
      const order = await new OrderModel({
        fullName: `${user?.firstName} ${user?.lastName}`,
        amount,
        cart: user?.cart,
        billing: {
          address: paymentIntent.charges.data[0].billing_details.address.line1,
          city: paymentIntent.charges.data[0].billing_details.address.city,
          zip: paymentIntent.charges.data[0].billing_details.address.postal_code,
          country: paymentIntent.charges.data[0].billing_details.address.country,
        },
        shipping: {
          address: paymentIntent.shipping.address.line1,
          city: paymentIntent.shipping.address.city,
          zip: paymentIntent.shipping.address.postal_code,
          country: paymentIntent.shipping.address.country,
        },
        orderNumber,
        invoiceNumber,
      });

      const OrderInformation = await order.save();

      await logger.info(`Successful Order, order _id: ${OrderInformation._id}`);

      // Delete user cart
      await UserModel.findOneAndUpdate(
        { _id: paymentIntent.metadata.user },
        {
          $pull: {
            cart: { $exists: true },
          },
        },
      );

      break;

    case "payment_intent.payment_failed":
      paymentIntent = req.body.data.object;
      console.log("PaymentMethod was attached to a Customer!", paymentIntent);
      await logger.info(`Order Failed, order id: [${paymentIntent.id}]`);
      break;

    default:
      console.log(`Unhandled event type ${req.body.type}`);
  }

  res.status(200).json({ received: true });
});

export default router;
