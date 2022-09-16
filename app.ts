import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./db/connect";
import notFound from "./middleware/not-found";
import errorHandlerMiddleware from "./middleware/error-handler";
import router from "./routes/authRoute";

const app = express();

//load env config
dotenv.config({ path: "./config/config.env" });

//mongo config
// connectDB();

//body parser
app.use(express.urlencoded({ extended: false }));

// middleware
app.use(express.static("./public"));
app.use(express.json());

//Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1", router);

app.use(notFound);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server running in ${PORT} `);
});
