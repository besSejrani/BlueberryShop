// Config
import "dotenv/config";
import { connection } from "@Utils/test/mongo";

// Database
import mongoose from "mongoose";
import { UserModel } from "@Model/user/User";

// Authentication
import bcrypt from "bcryptjs";

// Application
// import { application } from "../../../Express/index";

// Apollo
// import {ApolloServer} from "apollo-server-express"

// Test
import { TestGraphqlAction } from "@Utils/test/GraphqlAction";
// import request from "supertest";

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

// describe("POST /user", () => {
//   it("responds with json", (done) => {
//     const bla = request("http://localhost:4000")
//       .post("/graphql")
//       .auth("blueberry@shop.com", "123456789")
//       .set(
//         "token",
//         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGE5YTU4YWM3MzI0NTAwMTk1NmFmZTciLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MjIwODE0NTUsImV4cCI6MTYyMjE2Nzg1NX0.5xAd0ZnbI_C9eko-8qfdsWvRwzd-EMUAlw2tGrXuSwE",
//       )
//       .query(

//       )
//       .
//       .set("Accept", "application/json");

//     console.log(bla);

//     done();
//     //   .expect(200, done);
//   });
// });

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
});
