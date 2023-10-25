// packages/db/src/index.ts

import mongoose from "mongoose";

// Define mongoose schemas
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide an Email"],
    unique: true,
  },
  password: String,
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide an Email"],
    unique: true,
  },
  password: String,
  isAdmin: { type: Boolean, default: false },
});

const courseSchema = new mongoose.Schema({
  title: { type: String, required: [true, "Please provide a Title"] },
  description: {
    type: String,
    required: [true, "Please provide a Description"],
  },
  price: { type: Number, required: [true, "Please provide a Price"] },
  imageLink: {
    type: String,
    required: [true, "Please provide an Image link"],
  },
  published: Boolean,
    
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  }, // Reference to the admin who created the course
});

export const User =
  mongoose.models.User || mongoose.model("User", userSchema);
  const CourseType = mongoose.models.Course || mongoose.model("Course", courseSchema); 

  export type CourseType = typeof CourseType;
  
  const AdminType = mongoose.models.Admin || mongoose.model("Admin", adminSchema);
    
  export type AdminType = typeof AdminType; 
  
  export * from "./dbConnect";
  
  export { CourseType, AdminType };