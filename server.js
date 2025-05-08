import express from "express";
import cors from "cors";
import { ConnectDb } from "./src/config/db.js";
import userRouter from "./src/user/user-route.js";
//Instance of the application
const app = express();

//Database Connectivity
try {
  ConnectDb();
  console.log("connected to Db");
} catch (err) {
  console.log(err);
}

//Global Middleware
app.use(cors());
app.use(express.json());

//Custom Middleware
const reqLogger = (req, res, next) => {
  console.log(`${req.method} ${req.url} ${new Date().toISOString}`);
  next();
};
//TO Execute everytime use globally
app.use(reqLogger);

app.get("/health", (req, res) => {
  //   console.log(req.query);

  //Content-type:application/json
  //   res.json({ message: "All Good!" });
  //Content-type:text/html
  res.send("Home Page!");
});

//To get req.body parse the data using data-parser.urlEndcoded()
// app.post("/api/users", (req, res) => {
//   console.log("body:", req.body);

//   res.json({});
// });

//Custom middleware pass teh middle  ware between the handler
// app.post("/api/users", reqLogger, (req, res) => {
//   //   console.log("body:", req.body);
//   //   throw new Error("Something went wrong!");

//   res.json({});
// });

//-----------register Routes---------
app.use("/api/users", userRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  const errorMessage = err.message;
  const statusCode = err.statusCode;
  res.status(statusCode).json({ message: errorMessage });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server listening to the port : ${PORT}`);
});
