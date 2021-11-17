import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

export interface UserInput {
  email: string;
  password: string;
}

export interface UserDocument extends UserInput, Document {
  comparePassword(candidatePassword: string): Promise<Boolean>;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next: any) {
  const user = this as UserDocument;

  if (!user.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(config.get("saltRounds"));
  const hashPassword = await bcrypt.hash(user.password, salt);
  user.password = hashPassword;
  next();
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const user = this as UserDocument;

  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

const User = model<UserDocument>("User", UserSchema);

export default User;
