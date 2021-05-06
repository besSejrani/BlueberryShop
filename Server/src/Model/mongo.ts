import "dotenv/config";
import mongoose from "mongoose";

export default async () => {
  try {
    await mongoose.connect(process.env.MONGO_ATLAS!, {
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
