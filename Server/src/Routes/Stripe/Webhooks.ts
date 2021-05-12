// Database
import { OrderModel } from "@Model/Order";

// Express
import express from "express";
const router = express.Router();

// ========================================================================================================

router.post("/webhook", async (req, res) => {
  // Handle the event
  switch (req.body.type) {
    case "payment_intent.succeeded":
      const paymentIntent = req.body.data.object;
      // console.log("PaymentIntent was successful!", paymentIntent.charges);
      console.log("------------------", paymentIntent);
      console.log("--------------charges------------", paymentIntent.charges.data[0]);

      const amount = parseInt(paymentIntent.amount) / 100;

      const newOrder = await new OrderModel({
        fullName: "Besjan Sejrani",
        amount,
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

      await newOrder.save();

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
