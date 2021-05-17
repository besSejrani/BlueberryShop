// GraphQL
import { Resolver, Mutation, Arg } from "type-graphql";
import { SignupInput } from "./inputs/SignupInput";

// Database
import { UserModel } from "@Model/user/User";

// Authentication & Authorization
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Response
import { UserResponse } from "../user/types/UserType";

// Email
import { SendEmail } from "@Email/sendEmail";
import { createConfirmationUrl } from "@Email/createConfirmationUrl";

// Stripe
import Stripe from "stripe";

// =================================================================================================

@Resolver()
export class SignupResolver {
  @Mutation(() => UserResponse)
  async signup(@Arg("input") { firstName, lastName, username, email, password }: SignupInput): Promise<UserResponse> {
    const user = await UserModel.findOne({ email });

    if (user) {
      throw new Error("Invalid credentials");
    }

    const stripe = await new Stripe(`${process.env.STRIPE_PRIVATE_TEST_KEY}`, {
      apiVersion: "2020-08-27",
      maxNetworkRetries: 1,
      timeout: 1000,
    });

    const customer = await stripe.customers.create({
      name: username,
      email,
    });

    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);

    const newUser = await new UserModel({
      firstName,
      lastName,
      username,
      email,
      password: hash,
      stripeId: customer.id,
    });
    await newUser.save();

    // JWT
    const payload = {
      id: newUser.id,
      role: newUser.role,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET as string);

    // Email
    await SendEmail(email, await createConfirmationUrl(newUser.id));

    return { user: newUser, token };
  }
}
