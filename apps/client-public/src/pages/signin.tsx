// apps/client/src/pages/login.tsx
import axios from "axios";
import { Signup as Signin } from "ui";
import { useRouter } from "next/router";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { userState, userEmailState } from "store";
import { Typography } from "@mui/material";

export default function SigninPage() {
  const setUser = useSetRecoilState(userState);
  const router = useRouter();

  // Get the user's email from Recoil state
  const userEmail = useRecoilValue(userEmailState);

  // Check if the user is already logged in and redirect if necessary
  if (userEmail) {
    router.push("/course/market"); // Redirect to another page (e.g., '/')
    return null; // Render nothing on this page
  }

  const handleSignin = async (email: string, password: string) => {
    try {
      const res = await axios.post("/api/signin", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);

      // Set the user state to indicate the user is logged in
      setUser({
        isLoading: false,
        userEmail: email,
      });

      // Redirect to the desired page after successful login
      router.push("/course/market");
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        alert("Invalid credentials. Please enter correct email and password.");
      } else {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div>
      <div
        style={{
          paddingTop: 150,
          marginBottom: 10,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant={"h6"}>
          Welcome to eduBook. Sign in below!
        </Typography>
      </div>
      <Signin onClick={handleSignin} />
    </div>
  );
}
