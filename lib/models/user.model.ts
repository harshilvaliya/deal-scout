import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

// Extend IUser with custom methods
export interface IUser extends Document {
  name?: string;
  email: string;
  password: string;
  matchPassword(enteredPassword: string): Promise<boolean>; // Define the matchPassword method
}

// Define the user schema
const userSchema: Schema<IUser> = new Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Define matchPassword method
userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create and export the User model
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
