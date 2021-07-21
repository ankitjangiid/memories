import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// here we have to put '.js' because we're working on node not with react
import postRoutes from "./routes/posts.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// usign express middlewear to connecct to this application
// this is the starting url for all the posts
app.use("/posts", postRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to memories API");
});

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  // this is just what should happen when our connection is successful
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  // if connection is not successful then
  .catch((error) => console.log(error));

// this is just so we don't get warning in console
mongoose.set("useFindAndModify", false);
