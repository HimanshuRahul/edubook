// /pages/api/purchase-course/[courseid].ts

import { NextApiRequest, NextApiResponse } from 'next';
import { ensureDbConnected } from 'db';
import { User } from 'db';

ensureDbConnected();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const courseid = req.query.courseid as string;
    console.log("course id from purchase course courseid buy now post" + courseid)
    const userEmail = req.headers.useremail;
    console.log("email from purchase course courseid buy now post" + userEmail)


    if (!courseid || !userEmail) {
      return res.status(400).json({ message: 'Bad request' });
    }

    try {
      // Check if the user exists
      const user = await User.findOne({ email: userEmail });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Check if the user has already purchased this course
      if (user.purchasedCourses.includes(courseid)) {
        return res.status(400).json({ message: 'Course already purchased' });
      }

      // Add the course to the user's purchasedCourses
      user.purchasedCourses.push(courseid);
      await user.save();

      res.json({ success: true });
    } catch (error) {
      console.error('Error purchasing course:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).end(); // Method not allowed
  }
}
