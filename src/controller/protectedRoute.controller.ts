import { Request, Response } from "express";

export async function protectedRouteHandler(req: Request, res: Response) {
  try {
    return res.sendStatus(200);
  } catch (e: any) {
    return res.status(400).send(e);
  }
}
