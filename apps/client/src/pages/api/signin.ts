
import type { NextApiRequest, NextApiResponse } from "next";
import { AdminType as Admin } from "db";
import jwt from "jsonwebtoken";
import { ensureDbConnected } from "db";

// const SECRET = "SECRET"; // Replace with your actual secret key
const ADMINSECRET = process.env["NEXT_PUBLIC_ADMIN_SECRET"]


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
  const admin = await Admin.findOne({ email, password });

  if (!admin) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  
  // Generate a JWT token for the logged-in user
  const token = jwt.sign({ email, role: "admin" }, ADMINSECRET!, { expiresIn: "1h" });

  return res.status(200).json({ message: "Login successful", token });
}
