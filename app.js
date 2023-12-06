import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import connection from "./database/db.js";
import cookieParser from 'cookie-parser';
import userRouter from "./router/userRoutes.js";
import chalk from 'chalk';
import { Server } from 'socket.io';
import multer from "multer";

const app = express();
const upload = multer({ dest: 'uploads/' })

app.use(express.static('/public'));
app.use(cookieParser())
app.set("view engine", "ejs");
app.use(cors());
app.use(express.json());
dotenv.config();
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log("HTTP Method: " + req.method + " - URL: " + req.url);
    next();
});

app.use(morgan("dev"));
app.use(morgan("combined"));
app.use(helmet());
app.set('view engine', 'ejs');


app.use("/user", userRouter);
app.set("view options", { layout: false });


app.get('/', function (req, res) {
    res.render('multer');
    console.log(chalk.blue('Hello world!'));
});

app.post("/upload", upload.single("profileImage"), (req,res)=>{
    console.log(req.body);
    console.log(req.file);
    return res.redirect("/");
});

const port = process.env.PORT || 8000;
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

connection(username, password)

app.listen(port, () =>
    console.log(`Application Is Running Successfully On Local Host Port ${port}`)
);