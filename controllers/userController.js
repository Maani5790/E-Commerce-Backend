import userModel from "../models/user.js";

export const registerController = async (req, res) => {
    try {
        const { name, email, password, address, city, country, phone } = req.body;
        if (!name || !email || !password || !address, !city || !country, !phone) {
            return res.status(500).send({
                success: false,
                message: "Please Provide All Fields",
            });
        };
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(500).send({
                success: false,
                message: "oops email already registered"
            });
        };
        const user = await userModel.create({
            name,
            email,
            password,
            address,
            city,
            country,
            phone
        });
        res.status(201).send({
            success: true,
            message: "user created successfully",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In Register User",
            error,
        });
    };
};

export const loginController  = (req,res,next) =>{
    res.send("login")

}


export default { registerController, loginController }