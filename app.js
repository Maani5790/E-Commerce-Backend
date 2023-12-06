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
import multer from "multer";
import { createServer } from "node:http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage });

app.post("/upload", upload.fields([{ name: "profileImage" }, { name: "coverImage" }]), (req, res) => {
    console.log(req.body);
    console.log(req.file);
    return res.redirect("/");
});

app.use(express.static('/public'));
app.use(cookieParser())
app.set("view engine", "ejs");
app.use(cors());
app.use(express.json());
dotenv.config();
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan("dev"));
app.use(morgan("combined"));
app.use(helmet());
app.set('view engine', 'ejs');

app.use("/user", userRouter);
app.set("view options", { layout: false });

app.get('/', function (req, res) {
    res.render('multer');
    console.log(chalk.pink('Hello world!'));
});

const port = process.env.PORT || 8000;
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

connection(username, password)

app.listen(port, () =>
    console.log(chalk.yellow(`Application Is Running Successfully On Local Host Port ${port}`))
);