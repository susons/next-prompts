import mongoose from "mongoose";

let isConnected = false;

export const connectToDb = async () => {
  mongoose.set("strictQuery", true); // for console errors

  if (isConnected) {
    console.log("Already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;

    return isConnected;
  } catch (e) {
    console.log(e);
    return false;
  }
};
