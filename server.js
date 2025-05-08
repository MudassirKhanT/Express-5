import express from "express";
import cors from "cors";
//Instance of the application
const app = express();
//Global Middleware
app.use(cors());
app.use(express.json());
//To use the server you need to use the function of app.use()
// 1) ---- app.use(bodyParser.urlencoded());----
//2) app.use(express.json())---------To parse the body best practice
//3) express.json() is a middle ware

//Custom Middleware
const reqLogger = (req, res, next) => {
  console.log(`${req.method} ${req.url} ${new Date().toISOString}`);
  next();
};
//TO Execute everytime use globally
// app.use(reqLogger);

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
app.post("/api/users", reqLogger, (req, res) => {
  //   console.log("body:", req.body);
  throw new Error("Something went wrong!");
  res.json({});
});

//Error Handling Middleware should be called at last of the routes
//Recieves 4 params like req,res,next,error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something Broke!" });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server listening to the port : ${PORT}`);
});
