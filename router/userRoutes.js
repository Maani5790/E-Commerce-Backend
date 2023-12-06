import express from "express";
import { registerUser } from "../controllers/userController.js";
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.get("/register", (req, res, next) => {
    res.send("user register")
});

export default userRouter