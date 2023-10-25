// src/pages/api/courses.ts
import { CourseType } from "db";
import type { NextApiRequest, NextApiResponse } from "next";
import { ensureDbConnected } from "db";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await ensureDbConnected();

//   const userEmail = req.headers.useremail; // Use 'useremail' (all lowercase) to match the header key
//   console.log("user email - " + userEmail);

  if (req.method === "GET") {
    try {
      let courses: CourseType[] = [];

    //   if (userEmail) 
        // const admin = await AdminType.findOne({ email: userEmail });

        
          
        //   courses = await CourseType.find({ admin: admin._id });
          

          courses = await CourseType.find();
          console.log("courses inside admin - " + courses)
          
        
      
      
      res.json({ courses });
    } catch (error) {
      console.error("Error fetching courses:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }  else {
    res.status(405).end(); // Method not allowed
  }
}
