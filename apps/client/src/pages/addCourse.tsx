import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Card, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { z, ZodError } from "zod";
import { useRecoilValue } from "recoil";
import { userEmailState } from "store";

const formSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(1000),
  image: z.string().min(1).max(255),
  price: z.number().min(0),
});

const initialFormValues = {
  title: "",
  description: "",
  image: "",
  price: 0,
};

function AddCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState<string | number>(""); // Initialize with an empty string or a number
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState<Record<string, string | null>>(
    {}
  );
  const userEmail = useRecoilValue(userEmailState);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        minHeight: "80vh",
        WebkitJustifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          paddingTop: 100,
          marginBottom: 10,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant={"h5"}>
          Please fill below details to create new course
        </Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card
          variant={"outlined"}
          style={{ width: 400, padding: 20, marginTop: 30, height: "100%" }}
        >
          <TextField
            style={{ marginBottom: 10 }}
            onChange={(e) => {
              setFormValues({ ...formValues, title: e.target.value });
            }}
            fullWidth={true}
            label="Title"
            variant="outlined"
            value={formValues.title}
            error={!!formErrors.title}
            helperText={formErrors.title ?? ""}
          />

          <TextField
            style={{ marginBottom: 10 }}
            onChange={(e) => {
              setFormValues({ ...formValues, description: e.target.value });
            }}
            fullWidth={true}
            label="Description"
            variant="outlined"
            value={formValues.description}
            error={!!formErrors.description}
            helperText={formErrors.description ?? ""}
          />

          <TextField
            style={{ marginBottom: 10 }}
            onChange={(e) => {
              setFormValues({ ...formValues, image: e.target.value });
            }}
            fullWidth={true}
            label="Image link"
            variant="outlined"
            value={formValues.image}
            error={!!formErrors.image}
            helperText={formErrors.image ?? ""}
          />

          <TextField
            style={{ marginBottom: 10 }}
            onChange={(e) => {
              const inputPrice = e.target.value;
              setFormValues({ ...formValues, price: +inputPrice }); // Update formValues with a number
            }}
            fullWidth={true}
            type="number"
            label="Price"
            variant="outlined"
            value={formValues.price.toString()} // Convert it to a string for input
            error={!!formErrors.price}
            helperText={formErrors.price ?? ""}
            inputProps={{ min: 0 }}
          />

          <Button
            size={"large"}
            variant="contained"
            onClick={async () => {
              try {
                const validationResult = formSchema.safeParse(formValues);

                if (validationResult.success) {
                  await axios.post(
                    "/api/courses",
                    {
                      title: formValues.title,
                      description: formValues.description,
                      imageLink: formValues.image,
                      published: true,
                      price: formValues.price,
                    },
                    {
                      headers: {
                        Authorization:
                          "Bearer " + localStorage.getItem("token"),
                        useremail: userEmail,
                      },
                    }
                  );
                  alert("New course added successfully!");
                } else {
                  // Handle validation errors
                  const errorMap: Record<string, string | null> = {};

                  if (validationResult.error instanceof ZodError) {
                    validationResult.error.errors.forEach((error) => {
                      if (error.path) {
                        errorMap[error.path.join(".")] = error.message;
                      }
                    });
                  }

                  setFormErrors(errorMap);
                }
              } catch (error) {
                console.error("Error adding course:", error);
                alert("An error occurred while adding the course.");
              }
            }}
          >
            Add course
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default AddCourse;
