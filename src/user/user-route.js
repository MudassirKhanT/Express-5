import express from "express";
import { User } from "./user-model.js";
const router = express.Router();

router.post("/", async (req, res, next) => {
  const { name, email, password } = req.body;
  //Storing the data in the database
  //   console.log(name, email, password);
  //Main--validate the request
  //1)using manual checking
  //2)using middleware
  if (!name || !email || !password) {
    const error = new Error("All fields are requried");
    error.statusCode = 400;
    next(error);
    // return res.status(400).json({ message: "All Fields Are Requried" });
  }
  const result = await User.create({
    name,
    email,
    password,
  });
  console.log(result);

  res.status(201).json({ id: result._id });
});

export default router;
