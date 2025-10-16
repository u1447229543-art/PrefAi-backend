import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { ProviderType, type IUser } from "./user.dto";
import { HydratedDocument } from "mongoose";

const Schema = mongoose.Schema;

export const hashPassword = async (password: string) => {
  const hash = await bcrypt.hash(password, 12);
  return hash;
};

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true },
    password: { type: String, required: true, select: false },
    refreshToken: { type: String, default: "", select: false },
    active: { type: Boolean, default: true },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    blocked: { type: Boolean, default: false },
    blockReason: { type: String, default: "" },
    provider: {
      type: String,
      enum: Object.values(ProviderType),
      default: ProviderType.MANUAL,
    },
    image: { type: String },

    googleId: { type: String, select: false },
    facebookId: { type: String, select: false },

    firstName: { type: String, required: true },
    lastName: { type: String },
    userName: { type: String },
    securityNumber: { type: String },
    title: { type: String },
    country: { type: String },
    maritalStatus: { type: String },
    dob: { type: Date },
    arrivalDate: { type: Date },
    language: { type: String },
    passportNumber: { type: String },
    fcmToken: { type: String, default: "" },
  },
  { timestamps: true }
);

// Password hash middleware
UserSchema.pre("save", async function (next) {
  const user = this as HydratedDocument<IUser>;
  if (user.isModified("password") && user.password) {
    user.password = await hashPassword(user.password);
  }
  next();
});

export default mongoose.model<IUser>("user", UserSchema);
