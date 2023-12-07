import express from "express";
import { registerController } from "../controllers/userController.js";
const userRouter = express.Router();

userRouter.post("/register", registerController);
userRouter.get("/register", (req, res, next) => {
    res.send("user register");
});

export default userRouter