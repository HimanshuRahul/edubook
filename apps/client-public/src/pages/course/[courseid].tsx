// /pages/course/[courseid].tsx

import { Card, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Typography, Button } from "@mui/material";
import axios from "axios";
import { Loading } from "ui";
import { courseState } from "store";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { courseTitle, coursePrice, isCourseLoading, courseImage } from "store";
import { useRouter } from "next/router";
import { userEmailState } from "store";
import { GrayTopper } from "@/components/GrayTopper";
import { CourseCard } from "@/components/CourseCard";

function Course() {
  const router = useRouter();
  const { courseid } = router.query;
  const setCourse = useSetRecoilState(courseState);
  const courseLoading = useRecoilValue(isCourseLoading);
  console.log(courseid);
  useEffect(() => {
    axios
      .get(`/api/course/${courseid}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })

      .then((res) => {
        // console.log("Course inside tsx courseid - ");
        console.log(res.data.course);
        setCourse({ isLoading: false, course: res.data.course });
      })
      .catch((e) => {
        setCourse({ isLoading: false, course: null });
      });
  }, [courseid]);

  if (courseLoading) {
    return <Loading />;
  }

  return (
    <div>
      <GrayTopper />
      <Grid container>
        <Grid item lg={8} md={12} sm={12}>
          <UpdateCard courseid={courseid} router={router} />
        </Grid>
        <Grid item lg={4} md={12} sm={12}>
          <CourseCard />
        </Grid>
      </Grid>
    </div>
  );
}

function UpdateCard({ courseid, router }: { courseid: any; router: any }) {
  const [courseDetails, setCourse] = useRecoilState(courseState);
  const course = courseDetails.course;
  const userEmail = useRecoilValue(userEmailState) || "";

  // Initialize the state with default values or empty strings
  const [title, setTitle] = useState(course ? course.title : "");
  const [description, setDescription] = useState(
    course ? course.description : ""
  );
  const [image, setImage] = useState(course ? course.imageLink : "");
  const [price, setPrice] = useState(course ? course.price : "");
  const [isPurchased, setIsPurchased] = useState(false);

  useEffect(() => {
    if (course === null) {
      return;
    }

    const token = localStorage.getItem("token");
    if (token) {
      // Check if the course has been purchased
      axios
        .get(`/api/purchasedcourse/${courseid}`, {
          headers: {
            Authorization: "Bearer " + token,
            useremail: userEmail,
          },
        })
        .then((res) => {
          const hasPurchased = res.data.hasPurchased;
          setIsPurchased(hasPurchased);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [courseid, course, userEmail]);

  useEffect(() => {
    // Set the title, description, image, and price when the course data is available
    if (course) {
      setTitle(course.title);
      setDescription(course.description);
      setImage(course.imageLink);
      setPrice(course.price);
    }
  }, [course]);

  const handleBuyNow = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Handle the case where the user is not authenticated
      router.push("/signin");
      return;
    }

    try {
      axios
        .post(`/api/purchase-course/${courseid}`, null, {
          headers: {
            Authorization: "Bearer " + token,
            useremail: userEmail,
          },
        })
        .then((response) => {
          if (response.data.success) {
            // Set isPurchased to true to hide the "Buy Now" button
            setIsPurchased(true);
            // Redirect the user to the "My Courses" page
            // router.push("/my-courses");
          } else {
            // Handle the case where the purchase was not successful
            console.error("Purchase was not successful");
          }
        });
    } catch (error) {
      console.error("An error occurred during the purchase:", error);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card variant={"outlined"} style={{ maxWidth: 600, marginTop: 200 }}>
        <div style={{ padding: 20 }}>
          <Typography
            style={{ marginBottom: 10 }}
            variant="h4"
            textAlign={"center"}
          >
            {isPurchased ? "You have purchased this course" : "Buy this course"}
          </Typography>

          <Typography variant="subtitle1" style={{ marginBottom: 10 }}>
            <b>Title:</b> {title}
          </Typography>

          <Typography variant="subtitle1" style={{ marginBottom: 10 }}>
            <b>Description:</b> {description}
          </Typography>

          <Typography variant="body1" style={{ marginBottom: 10 }}>
            <b>Price:</b> &#8377;{price}
          </Typography>

          {isPurchased ? null : (
            <Button variant="contained" onClick={handleBuyNow}>
              BUY NOW
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}

export default Course;
