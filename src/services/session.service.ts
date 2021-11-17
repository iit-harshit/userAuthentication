import { LeanDocument } from "mongoose";
import Session, { SessionDocument } from "../model/session.model";
import config from "config";
import { UserDocument } from "../model/user.model";
import { decode, sign } from "../utils/jwt.utils";
import { get } from "lodash";
import { findUser } from "./user.service";

export async function createSession(userId: string, userAgent: string) {
  const session = await Session.create({ user: userId, userAgent });

  return session.toJSON();
}

export function createAccessToken({
  user,
  session,
}: {
  user:
    | LeanDocument<Omit<UserDocument, "password">>
    | Omit<UserDocument, "password">;
  session:
    | Omit<SessionDocument, "password">
    | LeanDocument<Omit<SessionDocument, "password">>;
}) {
  const accessToken = sign(
    { ...user, session: session._id },
    { expiresIn: config.get("accessTokenTime") }
  );
}
export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  // Decode the refresh token
  const { decoded } = decode(refreshToken);

  if (!decoded || !get(decoded, "_id")) return false;

  // Get the session
  const session = await Session.findById(get(decoded, "_id"));

  // Make sure the session is still valid
  if (!session || !session?.valid) return false;

  const user = await findUser({ _id: session.user });

  if (!user) return false;

  const accessToken = createAccessToken({ user, session });

  return accessToken;
}
