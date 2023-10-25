import axios from "axios";
import { Signup } from "ui";
import { useRouter } from "next/router";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { userState, userEmailState } from "store";
import { Typography } from "@mui/material";

export default function SignupPage() {
  const setUser = useSetRecoilState(userState);
  const router = useRouter();

  // Get the user's email from Recoil state
  const userEmail = useRecoilValue(userEmailState);

  // Check if the user is already signed up and redirect if necessary
  if (userEmail) {
    router.push("/courses"); // Redirect to another page (e.g., '/')
    return null; // Render nothing on this page
  }

  const handleSignup = async (email: string, password: string) => {
    try {
      const res = await axios.post("/api/signup", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);

      // Set the user state to indicate the user is logged in
      setUser({
        isLoading: false,
        userEmail: email,
      });

      router.push("/courses");
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        alert("Admin email already exists. Please use a different email.");
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
          Welcome to Admin eduBook. Sign up below!
        </Typography>
      </div>
      <Signup onClick={handleSignup} />
    </div>
  );
}
