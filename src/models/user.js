import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const UserSchema = new mongoose.Schema(
  {
    // username: {
    //   type: String,
    //   unique: [true, "Username already exists!"],
    //   required: [true, "Username is required!"],
    //   lowercase: true,
    //   trim: true,
    // },
    email: {
      type: String,
      unique: [true, "Email already exists!"],
      required: [true, "Email is required!"],
      lowercase: true,
      trim: true,
    },
    // notifications: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Notification",
    //   },
    // ],
    password: {
      type: String,
      default: undefined,
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/cnq/image/upload/v1586197723/noimage_d4ipmd.png",
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
  },
  { timestamps: true }
);

UserSchema.set("toJSON", { getters: true, virtuals: false, minimize: false });
UserSchema.index({ email: 1, username: 1 });

const User = mongoose.models.User || mongoose.model("User", UserSchema);


export default User;
