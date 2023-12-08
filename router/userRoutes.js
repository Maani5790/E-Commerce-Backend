import express from "express";
import { loginController, registerController } from "../controllers/userController.js";
const userRouter = express.Router();

userRouter.post("/register", registerController);
userRouter.post("/login", loginController);
userRouter.get("/register", (req, res, next) => {
    res.send("user register");
});

export default userRouter;