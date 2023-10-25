import type { NextApiRequest, NextApiResponse } from 'next';
import { CourseType as Course } from 'db';
import { ensureDbConnected } from 'db';

ensureDbConnected();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    
    
  if (req.method === 'PUT') {
    try {
      const courseId = req.query.courseid;
      const course = await Course.findByIdAndUpdate(courseId, req.body, { new: true });

      if (course) {
        return res.json({ message: 'Course updated successfully', course });
      } else {
        return res.status(404).json({ message: 'Course not found' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'GET') {
    try {
      const courseId = req.query.courseid;
      const course = await Course.findById(courseId);

      if (course) {
        return res.json({ course });
      } else {
        return res.status(404).json({ message: 'Course not found' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    return res.status(405).end(); // Method not allowed
  }
}
