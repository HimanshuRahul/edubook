// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { AdminType as Admin } from 'db';
import jwt from 'jsonwebtoken';
import { ensureDbConnected } from 'db';

// const SECRET = "SECRET";
const ADMINSECRET = process.env["NEXT_PUBLIC_ADMIN_SECRET"]

type Data = {
  token?: string;
  message?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    console.log("handler called");
    await ensureDbConnected();
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

      if (admin) {
        return res.status(400).json({ message: 'Admin already exists' });
      } else {
        const obj = { email: email, password: password, isAdmin: true };
        const newAdmin = new Admin(obj);
        await newAdmin.save();

        const token = jwt.sign({ email, role: 'admin' }, ADMINSECRET!, { expiresIn: '1h' });
        return res.status(201).json({ message: 'Admin created successfully', token });
      }
  }
