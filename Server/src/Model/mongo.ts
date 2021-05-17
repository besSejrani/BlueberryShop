import "dotenv/config";
import mongoose from "mongoose";

export default async () => {
  let connection;

  if (process.env.NODE_ENV === "production") {
    connection = process.env.MONGO_PRODUCTION;
  }

  if (process.env.NODE_ENV === "development") {
    connection = process.env.MONGO_DEVELOPMENT;
  }

  if (process.env.NODE_ENV === "test") {
    connection = process.env.MONGO_TEST;
  }

  try {
    await mongoose.connect(connection || process.env.MONGO_ATLAS!, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    await console.log("Connected to database");
  } catch (error) {
    console.log(error.message);
    console.log("Couldn't connect to database");
  }
};
