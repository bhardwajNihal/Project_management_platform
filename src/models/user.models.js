import mongoose, { Schema } from "mongoose";
import brcypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new Schema(
  {
    avatar: {
      type: {
        url: String,
        localPath: String,
      },
      default: {
        url: `https://placehold.co/200x200`,
        localPath: "",
      },
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordExpiry: {
      type: Date,
    },
    emailVerificationToken: {
      type: String,
    },
    emailVerificationExpiry: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

export const UserModel = new mongoose.model("users", userSchema);


// another way to hash password before storing it to the db
// is using pre() hooks native to mongoose

userSchema.pre("save", async function(next){

    if(!this.isModified("password")) return next();         // makes sure that this hook is run only when there's something with the password

    await brcypt.hash(this.password, 10);
    next();
})


// now using mongoose methods
// method to verify password
userSchema.methods.isPasswordCorrect = async function(password) {
    
    return await brcypt.compare(password, this.password);
    
}