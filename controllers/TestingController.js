import userModel from "../models/user.js";

export const SignUp = async (req, res) => {
    try {
        const { email, name, password } = req.body;
        if (!email, !name, !password) {
            return res.status(404).send({
                success: false,
                message: "provide all field"
            });
        };
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.send(404).send({
                success: false,
                message: "user already exist"
            });
        };
        const user = await userModel.create({
            email,
            name,
            password
        });
        res.status(201).send({
            success: true,
            message: "user created successfully",
            user,
        });

    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In Register User",
            error,
        });
    };
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email, !password) {
        return res.status(500).send({
            success: false,
            message: "please enter all data"
        });
    };

    const user = await userModel.findOne({ email })
    if (!user) {
        res.status(404).send({
            success: false,
            message: "user not found"
        });
    };
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
        return res.status(404).send({
            success: false,
            message: "invalid credentials"
        });
    };










};
