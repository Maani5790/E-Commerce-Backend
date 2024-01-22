import JWT from "jsonwebtoken";
import userModel from "../models/user.js";
export const isAuth = async (req, res) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(404).send({
            success: false,
            message: "unauthorize user"
        });
    };
    const decodeData = JWT.verify(token, process.env.JWT_SECRET)
    req.user = await userModel.findById(decodeData._id);
    next();
};

export default isAuth