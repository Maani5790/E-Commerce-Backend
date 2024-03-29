import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"]
    },
    email: {
        type: String,
        required: [true, "email is required"]
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minLength: [6, "password length should be greater than 6"]
    },
    address: {
        type: String,
        required: [true, "address is required"]
    },
    city: {
        type: String,
        required: [true, "city is required"]
    },
    country: {
        type: String,
        required: [true, "country is required"]
    },
    phone: {
        type: String,
        required: [true, "phone is required"]
    },
    profilePic: {
        type: String,
    },

}, { Timestamp: true });

userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (plainPassword) {
    return await bcrypt.compare(plainPassword, this.password);
};

userSchema.methods.generateToken = function () {
    return Jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: "7d", })
}

// userSchema.methods.generateToken = function () {
//     return Jwt.sign({_id:this._id}, process.env.JWT.SECRET, {expiresIn:"7d",})
// }

const userModel = mongoose.model("Users", userSchema);
export default userModel;