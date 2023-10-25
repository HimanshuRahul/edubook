// src/pages/api/courses.ts
import { CourseType, AdminType } from "db";
import type { NextApiRequest, NextApiResponse } from "next";
import { ensureDbConnected } from "db";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await ensureDbConnected();

  const userEmail = req.headers.useremail; // Use 'useremail' (all lowercase) to match the header key
  console.log("user email - " + userEmail);

  if (req.method === "GET") {
    try {
      let courses: CourseType[] = [];

      if (userEmail) {
        const admin = await AdminType.findOne({ email: userEmail });

        if (admin) {
          console.log("admin id - " + admin._id)
          courses = await CourseType.find({ admin: admin._id });
          console.log("courses inside admin - " + courses)

          // courses = await CourseType.find();
          
        }
      }
      
      res.json({ courses });
    } catch (error) {
      console.error("Error fetching courses:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else if (req.method === "POST") {
    try {
      const { title, description, imageLink, price } = req.body;

      if (!title || !description || !imageLink || isNaN(price)) {
        return res.status(400).json({ message: "Invalid input data" });
      }

      const admin = await AdminType.findOne({ email: userEmail });
      console.log("Email from adding course - " + admin)

      if (!admin) {
        return res.status(403).json({ message: "Admin not found" });
      }

      // Associate the admin's _id with the created course
      const course = new CourseType({
        title,
        description,
        imageLink,
        published: true,
        price,
        admin: admin._id, // Associate admin with course
      });

      await course.save();
      res.json({ message: "Course created successfully", courseId: course._id });
    } catch (error) {
      console.error("Error creating course:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).end(); // Method not allowed
  }
}
