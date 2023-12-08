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

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(500).send({
                success: false,
                message: "Please Add Email OR Password",
            });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "USer Not Found",
            });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(500).send({
                success: false,
                message: "invalid credentials",
            });
        }
        res
            .status(200)
            .send({
                success: true,
                message: "Login Successfully",
                user,
            });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: "false",
            message: "Error In Login Api",
            error,
        });
    }
};


export default { registerController, loginController }