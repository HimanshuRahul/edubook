
import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "db";
import jwt from "jsonwebtoken";
import { ensureDbConnected } from "db";

const SECRETPUBLIC = process.env["NEXT_PUBLIC_USER_SECRET"]

type Data = {
  token?: string;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await ensureDbConnected();
  const { email, password } = req.body;

  // Find the admin by email and password 
  const user = await User.findOne({ email, password });

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Generate a JWT token for the logged-in user
  const token = jwt.sign({ email, role: "user" }, SECRETPUBLIC!, { expiresIn: "1h" });

  return res.status(200).json({ message: "Login successful", token });
}
