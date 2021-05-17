// Express
import express from "express";

// Database
import { UserModel } from "@Model/user/User";
import { OrderModel } from "@Model/Order";

// Logger
import logger from "@Logger/index";

// ========================================================================================================

const router = express.Router();

router.post("/webhook", async (req, res) => {
  // Handle the event
  switch (req.body.type) {
    case "payment_intent.succeeded":
      const paymentIntent = req.body.data.object;

      // Find corresponding user
      const user = await UserModel.findById({ _id: paymentIntent.metadata.user });
      const amount = parseInt(paymentIntent.amount) / 100;

      // Save user
      const order = await new OrderModel({
        fullName: `${user?.firstName} ${user?.lastName}`,
        amount,
        cart: user?.cart,
        billing: {
          country: paymentIntent.charges.data[0].billing_details.address.country,
          address: paymentIntent.charges.data[0].billing_details.address.line1,
          city: paymentIntent.charges.data[0].billing_details.address.postal_code,
        },
        shipping: {
          city: paymentIntent.shipping.address.postal_code,
          country: paymentIntent.shipping.address.country,
          address: paymentIntent.shipping.address.line1,
        },
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

    case "payment_method.attached":
      const paymentMethod = req.body.data.object;
      console.log("PaymentMethod was attached to a Customer!", paymentMethod);
      break;

    // ... handle other event types
    default:
      console.log(`Unhandled event type ${req.body.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.status(200).json({ received: true });
});

export default router;
