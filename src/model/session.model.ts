import { Schema, model, Document } from "mongoose";
import { UserDocument } from "./user.model";

export interface SessionDocument extends Document {
  user: UserDocument["_id"];
  valid: Boolean;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
}

const SessionSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    valid: { type: Boolean, default: false },
    userAgent: { type: String },
  },
  { timestamps: true }
);

const Session = model<SessionDocument>("Session", SessionSchema);

export default Session;
