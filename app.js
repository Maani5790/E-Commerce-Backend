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
// import { Server } from 'socket.io';

const app = express();
// const upload = multer({ dest: 'uploads/' });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./uploads");
        // return cb(null, "./uploads/${req.user_id}");
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`);
        // return cb(null, `${req.user._id}-${file.originalname}`);
    },
});
// const upload = multer({ storage: storage });
const upload = multer({ storage });

// app.post("/upload", upload.single("profileImage"), (req, res) => {
//     console.log(req.body);
//     console.log(req.file);
//     return res.redirect("/");
// });
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

const port = process.env.PORT || 8000;
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

connection(username, password)

app.listen(port, () =>
    console.log(`Application Is Running Successfully On Local Host Port ${port}`)
);