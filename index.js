import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import booksRoutes from "./routes/booksRoutes.js";
import userCredsRoutes from "./routes/userCredsRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import invalidRoutesHandler from "./utils/invalidRoutesHandler.js";
import connectDB from "./utils/connectDb.js";
import dotenv from "dotenv";
import colors from "colors";

dotenv.config();
connectDB();
colors.enable();
// const bcrypt =bcrypt();
const app = express();
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

//GET, POST, PUT, PATCH, DELETE
app.use("/books", booksRoutes);
app.use("/creds",userCredsRoutes);
app.use("/user",usersRoutes);
app.use(invalidRoutesHandler);

const PORT = 3001;
app.listen(PORT, ()=>{ console.log(`the server is listening on port ${PORT}`.bold.white) });