// Config
import "dotenv/config";
import { connection } from "@Utils/test/mongo";

// Database
import mongoose from "mongoose";
import { UserModel } from "@Model/user/User";

// Authentication
import bcrypt from "bcryptjs";

// Test
import { TestGraphqlAction } from "@Utils/test/GraphqlAction";

// =================================================================================================

// Pre Process
beforeAll(async (done) => {
  await connection(process.env.MONGO_TEST_JEST);

  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash("123456789", salt);

  const activeUser = {
    firstName: "Blueberry",
    lastName: "Shop",
    username: "bes",
    email: "blueberry@shop.com",
    password: hash,
    confirmed: true,
    role: "admin",
  };

  const user = await new UserModel({
    ...activeUser,
  });

  await user.save();
  done();
});

// Post Process
afterAll(async (done) => {
  await UserModel.deleteMany({});
  await mongoose.connection.close();
  done();
});

// =================================================================================================

const signinMutation = `mutation Signin(
    $email: String!, $password: String!) {
    signin(input: { email: $email, password: $password }) {
      user {
        username
        email
      }
      token
    }
  }`;

describe("Signup Resolver", () => {
  it("should sign in as blueberry user", async (done) => {
    const response = await TestGraphqlAction({
      source: signinMutation,
      variableValues: {
        email: "blueberry@shop.com",
        password: "123456789",
      },
    });

    expect(response).toMatchObject({
      data: {
        signin: {
          user: {
            username: "bes",
            email: "blueberry@shop.com",
          },
          token: response.data?.signin?.token,
        },
      },
    });

    done();
  });

  it("should not sign the user in", async (done) => {
    const response = await TestGraphqlAction({
      source: signinMutation,
      variableValues: {
        email: "blueerry@shop.com",
        password: "123456789",
      },
    });

    expect(response).toMatchObject({
      data: null,
    });

    done();
  });
});
