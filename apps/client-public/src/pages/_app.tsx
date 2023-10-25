import "@/styles/globals.css";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { sizing } from "@mui/system";
import type { AppProps } from "next/app";
import { useRecoilValue, useSetRecoilState, RecoilRoot } from "recoil";
import { isUserLoading, userState } from "store";
import axios from "axios";
import { useEffect } from "react";
import Appbar from "@/components/Appbar";
import { Router, useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter(); // Get the router object

  return (
    <RecoilRoot>
      <App2
        Component={Component}
        pageProps={pageProps}
        router={router as Router}
      />
    </RecoilRoot>
  );
}

function App2({ Component, pageProps }: AppProps) {
  const userLoading = useRecoilValue(isUserLoading);
  if (userLoading) {
    return (
      <div>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          sx={{ height: "100%" }}
        >
          <CircularProgress />
        </Box>

        <InitUser />
      </div>
    );
  }
  return (
    <div>
      <Appbar />
      <Component {...pageProps} />
    </div>
  );
}

function InitUser() {
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Check if the user is logged in (token exists)
    if (token) {
      const init = async () => {
        try {
          const response = await axios.get(`/api/auth/me`, {
            headers: {
              Authorization: "Bearer " + token,
            },
          });

          if (response.data.user) {
            console.log(response.data.user);

            setUser({
              isLoading: false,
              userEmail: response.data.user.email,
            });
          } else {
            setUser({
              isLoading: false,
              userEmail: null,
            });
          }
        } catch (e) {
          setUser({
            isLoading: false,
            userEmail: null,
          });
        }
      };

      init();
    } else {
      // If the user is not logged in, set isLoading to false
      setUser({
        isLoading: false,
        userEmail: null,
      });
    }
  }, [setUser]);

  return <></>;
}
