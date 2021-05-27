// Config
import "dotenv/config";
import { connection } from "@Utils/test/mongo";

// Database
import mongoose from "mongoose";
import { UserModel } from "@Model/user/User";

// Fake Data
import faker from "faker";

// Test
import { TestGraphqlAction } from "@Utils/test/GraphqlAction";

// =================================================================================================

// Pre Process
beforeAll(async (done) => {
  await connection(process.env.MONGO_TEST_JEST);
  done();
});

// Post Process
afterAll(async (done) => {
  await UserModel.deleteMany({});
  await mongoose.connection.close();
  done();
});

// =================================================================================================

const registerMutation = `mutation Signup(
  $firstName: String!
  $lastName: String!
  $username: String!
  $email: String!
  $password: String!
) {
  signup(
    input: {
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    }
  )
}`;

const user = {
  firstName: `${faker.name.firstName()}`,
  lastName: `${faker.name.lastName()}`,
  username: `${faker.internet.userName()}`,
  email: `${faker.internet.email()}`,
  password: `${faker.internet.password()}`,
};

describe("Signup resolver", () => {
  it("should send a graphql response", async (done) => {
    const response = await TestGraphqlAction({
      source: registerMutation,
      variableValues: {
        ...user,
      },
    });

    expect(response).toMatchObject({
      data: {
        signup: true,
      },
    });

    done();
  });

  it("should verify the user in the database", async (done) => {
    const dbUser = await UserModel.findOne({ firstName: user.firstName });
    expect(dbUser).toBeDefined();
    expect(dbUser?.confirmed).toBeFalsy();
    expect(dbUser?.firstName).toBe(user.firstName);

    done();
  });
});
