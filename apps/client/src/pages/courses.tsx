// client/src/pages/courses.tsx
import { Button, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { userEmailState } from "store";

interface Course {
  _id: string;
  title: string;
  description: string;
  imageLink: string;
  price: number; // Add the missing 'price' property here
}

function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const router = useRouter();

  const userEmail = useRecoilValue(userEmailState); // Get the userEmail from Recoil

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await axios.get("/api/courses", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            // Include userEmail in the headers
            useremail: userEmail,
          },
        });

        if (response.data && Array.isArray(response.data.courses)) {
          setCourses(response.data.courses);
        } else {
          console.error("Invalid response format from the API.");
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }

    fetchCourses();

    // Redirect to the /signin page if the user is not authenticated (userEmail is null)
    if (!userEmail) {
      router.push("/signin");
    }
  }, [userEmail, router]);

  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {courses.length === 0 ? (
        <p>No courses available.</p>
      ) : (
        courses.map((course) => <CourseCard key={course._id} course={course} />)
      )}
    </div>
  );
}

function CourseCard({ course }: { course: Course }) {
  const router = useRouter();

  return (
    <Card
      style={{
        margin: 10,
        width: 300,
        minHeight: 200,
        padding: 20,
      }}
    >
      <Typography textAlign={"center"} variant="h5">
        {course.title}
      </Typography>
      <Typography textAlign={"center"} variant="subtitle1">
        {course.description}
      </Typography>
      <img src={course.imageLink} style={{ width: 300 }} alt={course.title} />
      <Typography textAlign={"center"} variant="subtitle1">
        <b> Price: &#8377;{course.price} </b>
      </Typography>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <Button
          variant="contained"
          size="large"
          onClick={() => {
            router.push("/course/" + course._id);
          }}
        >
          View
        </Button>
      </div>
    </Card>
  );
}

export default Courses;
