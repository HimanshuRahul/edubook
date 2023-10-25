import { Card, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().min(1).max(100).email(),
  password: z.string().min(8).max(100),
});

interface SignupProps {
  onClick: (email: string, password: string) => void;
}

export function Signup({ onClick }: SignupProps): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({ email: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = formSchema.safeParse({
      email,
      password,
    });

    if (!result.success) {
      const errors = result.error.issues.map((issue) => {
        return { path: issue.path.join("."), message: issue.message };
      });

      const errorObject = { email: "", password: "" };

      errors.forEach((error) => {
        if (error.path === "email") {
          errorObject.email = error.message;
        } else if (error.path === "password") {
          errorObject.password = error.message;
        }
      });

      setFormErrors(errorObject);
      return;
    }

    // If validation succeeds, clear any previous errors and call onClick
    setFormErrors({ email: "", password: "" });
    onClick(result.data.email, result.data.password);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card variant={"outlined"} style={{ width: 400, padding: 20 }}>
          <form onSubmit={handleSubmit}>
            <TextField
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              fullWidth={true}
              label="Email"
              variant="outlined"
              error={Boolean(formErrors.email)}
              helperText={formErrors.email}
            />
            <br />
            <br />
            <TextField
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              fullWidth={true}
              label="Password"
              variant="outlined"
              type={"password"}
              error={Boolean(formErrors.password)}
              helperText={formErrors.password}
            />
            <br />
            <br />

            <Button type="submit" size={"large"} variant="contained">
              Submit
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
