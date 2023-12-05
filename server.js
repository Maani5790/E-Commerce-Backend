import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import connection from "./database/db.js";
import cookieParser from 'cookie-parser';

const server = express();

server.use(cookieParser())
server.set("view engine", "ejs");
server.use(cors());
server.use(express.json());
dotenv.config();
server.use(bodyParser.json({ extended: true }));
server.use(bodyParser.urlencoded({ extended: true }));

server.use((req, res, next) => {
    console.log("HTTP Method: " + req.method + " - URL: " + req.url);
    next();
});

server.use(morgan("dev"));
server.use(morgan("combined"));
server.use(helmet());

const port = 8000;
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

connection(username, password)

server.listen(port, () =>
    console.log(`Server is running successfully on PORT ${port}`)
);