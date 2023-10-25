import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from 'db';
import jwt from 'jsonwebtoken';
import { ensureDbConnected } from 'db';

// const SECRET = "SECRET";

const SECRETPUBLIC = process.env["NEXT_PUBLIC_USER_SECRET"]

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
    const admin = await User.findOne({ email });

      if (admin) {
        return res.status(400).json({ message: 'User already exists' });
      } else {
        const obj = { email: email, password: password };
        const newUser = new User(obj);
        await newUser.save();

        const token = jwt.sign({ email, role: 'user' }, SECRETPUBLIC!, { expiresIn: '1h' });
        return res.status(201).json({ message: 'User created successfully', token });
      }
  }
