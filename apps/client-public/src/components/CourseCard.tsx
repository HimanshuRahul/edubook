import { useRecoilValue } from "recoil";
import { courseTitle, courseImage } from "store";
import { Card } from "@mui/material";
import { Typography } from "@mui/material";

export function CourseCard() {
  const title = useRecoilValue(courseTitle);
  const imageLink = useRecoilValue(courseImage);

  return (
    <div
      style={{
        display: "flex",
        marginTop: 50,
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Card
        style={{
          margin: 10,
          width: 350,
          minHeight: 200,
          borderRadius: 20,
          marginRight: 50,
          paddingBottom: 5,
          zIndex: 2,
        }}
      >
        <img src={imageLink} alt="Course Image" style={{ width: 350 }}></img>

        <div style={{ marginLeft: 10 }}>
          <Typography variant="h5">{title}</Typography>
        </div>
      </Card>
    </div>
  );
}
