import React from "react";
import { Container, Typography, Button } from "@mui/material";
import useStyles from "@/styles/Landing.module.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import SchoolIcon from "@mui/icons-material/School";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import { useRouter } from "next/router";

const Landing: React.FC = () => {
  const router = useRouter();
  return (
    <>
      <div className={useStyles.root}>
        <div className={useStyles.container}>
          <img src="hero.jpg" alt="Course Image" className={useStyles.image} />
          <div className={useStyles.overlay}>
            <Typography className={useStyles.title} variant="h1">
              Welcome to EduBook
            </Typography>
            <Typography className={useStyles.description} variant="body1">
              Start your async learning today with our high-quality courses.
            </Typography>
            <Button
              className={useStyles.button}
              variant="contained"
              color="primary"
              onClick={() => router.push("/signin")}
            >
              Get Started
            </Button>
          </div>
        </div>

        <br />
        <div
          style={{
            margin: "12%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Card
            sx={{
              maxWidth: 400,
              maxHeight: 400,
              height: 400,
              width: 360,
              borderRadius: 10,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LibraryBooksIcon
              color="secondary"
              sx={{
                fontSize: 200,
              }}
            ></LibraryBooksIcon>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{
                  textAlign: "center", // Center text within the line
                }}
              >
                Learning
              </Typography>
              <br />
              <Typography variant="body2" color="text.secondary">
                Learning is the key to personal and professional growth. Explore
                our high-quality courses to enhance your knowledge and skills.
              </Typography>
            </CardContent>
          </Card>

          <Card
            sx={{
              maxWidth: 400,
              maxHeight: 400,
              height: 400,
              width: 360,
              borderRadius: 10,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SchoolIcon
              color="secondary"
              sx={{
                fontSize: 200,
              }}
            ></SchoolIcon>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{
                  textAlign: "center",
                }}
              >
                Education
              </Typography>
              <br />
              <Typography variant="body2" color="text.secondary">
                Education is the foundation of a brighter future. Explore from
                our curated courses and select the best skills to upgrade your
                knowledge.
              </Typography>
            </CardContent>
          </Card>

          <Card
            sx={{
              maxWidth: 400,
              maxHeight: 400,
              height: 400,
              width: 360,
              borderRadius: 10,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SwitchAccountIcon
              color="secondary"
              sx={{
                fontSize: 200,
              }}
            ></SwitchAccountIcon>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{
                  textAlign: "center",
                }}
              >
                Access
              </Typography>
              <br />
              <Typography variant="body2" color="text.secondary">
                Access to knowledge and opportunities. Get knowledge delivered
                to you 24/7 with multiple device support.
              </Typography>
            </CardContent>
          </Card>
        </div>

        <div className={useStyles.container} style={{ marginBottom: 200 }}>
          <img src="admin.jpg" alt="Course Image" className={useStyles.image} />

          <div className={useStyles.overlay}>
            <Typography className={useStyles.title} variant="h1">
              Share your Knowledge!
            </Typography>
            <Typography className={useStyles.description} variant="body1">
              Become an educator and share your knowledge with the world.
            </Typography>
            <Button
              className={useStyles.button}
              variant="contained"
              color="primary"
              // onClick={() => router.push("/")}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
