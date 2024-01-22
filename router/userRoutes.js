import express from "express";
import { getUserProfileController, loginController, registerController } from "../controllers/userController.js";
import  isAuth  from "../middlewares/authMiddleware.js";
const userRouter = express.Router();

userRouter.post("/register", registerController);
userRouter.post("/login", loginController);
userRouter.get("/login", (req, res, next) => {
    res.send("user login");
});
userRouter.get("/register", (req, res, next) => {
    res.send("user register");
});

userRouter.get("/profile", isAuth, getUserProfileController)

export default userRouter;