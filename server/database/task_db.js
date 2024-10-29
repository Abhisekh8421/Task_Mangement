import mongoose from "mongoose";

export const connectDb = async () => {
  await mongoose
    .connect(
      // "mongodb+srv://abhisekhsuru:abhisekhsuru@cluster0.1io10.mongodb.net/"
      "mongodb://localhost:27017",
      {
        dbName: "TaskManagement",
      }
    )
    .then(() => console.log("DATABASE IS CONNECTED"))
    .catch((e) => console.log(e.message));
};
