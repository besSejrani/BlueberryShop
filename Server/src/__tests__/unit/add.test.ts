// Config
import "dotenv/config";
import { connection } from "../../utils/test/mongo";

// Database
import mongoose from "mongoose";
// import { UserModel } from "../../Model/user/User";

// =================================================================================================

// Pre Process
beforeAll(async (done) => {
  await connection(process.env.MONGO_TEST_JEST);

  done();
});

// Post Process
afterAll(async () => {
  await mongoose.connection.close();
});

// =================================================================================================

describe("sum function", () => {
  it("sums up two integers", async (done) => {
    // const user = await UserModel.findOne({});

    // console.log(user);

    const sum = (a: number, b: number) => {
      return a + b;
    };
    expect(sum(1, 2)).toEqual(3);
    done();
  });
});
