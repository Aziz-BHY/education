const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const coursRouter = require("./routes/coursRoutes");
const chapitreRouter = require("./routes/chapitreRoutes");
const uploadRouter = require("./routes/uploadRoutes");
const classeRouter = require("./routes/classeRoutes");
const fileRouter = require("./routes/filesRoutes");
const PORT = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/cours", coursRouter);
app.use("/chapitre", chapitreRouter);
app.use("/upload", uploadRouter);
app.use("/classe", classeRouter)
app.use("/file", fileRouter)

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});