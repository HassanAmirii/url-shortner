import app from "./app.js";
import "dotenv/config";
import mongoose from "mongoose";

const port = process.env.PORT || 3000;
async function startServer() {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("db connected succesfully");
    app.listen(port, () => console.log(`server running on port ${port}`));
  } catch (error) {
    console.error("error connecting to db", error);
  }
}
startServer();
