
import { NextApiRequest, NextApiResponse } from 'next';
import { ensureDbConnected } from 'db';
import { User } from 'db';

ensureDbConnected();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const userEmail = req.headers.useremail; // Replace with your header key
    const courseid = req.query.courseid as string; // Extract courseId from query parameters

    if (!userEmail || !courseid) {
      return res.status(400).json({ message: 'Bad request' });
    }

    try {
      // Fetch the user by email and check if they have purchased the specific course
      const user = await User.findOne({ email: userEmail, purchasedCourses: courseid });

      if (user) {
        return res.json({ hasPurchased: true });
      }

      return res.json({ hasPurchased: false });
    } catch (error) {
      console.error('Error checking user:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).end(); // Method not allowed
  }
}
