import mongoose from "mongoose";

export const ConnectDb = () => {
  mongoose.connect(process.env.DB_URL);
};
