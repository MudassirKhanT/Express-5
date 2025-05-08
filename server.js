import express from "express";
//Instance of the application
const app = express();

//To use the server you need to use the function of app.use()

app.get("/", (req, res) => {
  return res.send("Home Page!");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server listening to the port : ${PORT}`);
});
