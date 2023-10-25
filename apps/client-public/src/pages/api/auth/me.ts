import type { NextApiRequest, NextApiResponse } from "next";
import { ensureDbConnected } from "db";
import { getUser } from "@/lib/middleware";

type Data = {
  email: string;
  password: string;
  // Add other properties as needed
};

export default async function meHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await ensureDbConnected();
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    getUser(token, (userId) => {
      if (!userId) {
        return res.status(403).json({}); // Send a response here and return
      }
      return res.json({ user: userId }); // Send a response here and return
    });
  } else {
    return res.status(403).json({}); // Send a response here and return
  }
}
