import React from "react";
import TextField from "@mui/material/TextField";
import {
  Button,
  Box,
  Checkbox,
  useMediaQuery,
  createTheme,
  Link,
} from "@mui/material";
import image from "./images/image.png";
import logo from "./images/logo.png";

const theme = createTheme();
export default function Login() {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div style={{ overflow: "hidden" }}>
      <div className="row">
        <div
          className="col-md-6"
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            paddingTop: "100px",
            overflow: "auto", // Add overflow auto to handle vertical overflow
          }}
        >
          <img src={logo} alt="Logo" />
          <br />
          <div>
            <p
              style={{
                paddingTop: "10px",
                lineHeight: "22.5px",
                fontSize: "15px",
              }}
            >
              Welcome back!
              <br />
              Please Login/Signup to your account.
            </p>
          </div>
          <Box
            sx={{
              maxWidth: "100%",
              padding: "9px",
              width: "80%",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              paddingLeft: "15px",
            }}
          >
            <TextField
              fullWidth
              id="outlined-basic"
              label="Email Address"
              style={{ paddingBottom: "10px" }}
            />
            <TextField
              fullWidth
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
                marginTop: "20px",
              }}
            >
              <Link
                style={{
                  // marginRight: isSmallScreen ? "40px" : "40px",
                  color: "#000000",
                  textDecoration: "none",
                  fontSize: isSmallScreen ? "14px" : "16px",
                }}
              >
                <Checkbox /> Remember Me
              </Link>
              <Link
                style={{
                  //paddingLeft: "150px",
                  color: "#000000",
                  textDecoration: "none",
                  fontSize: isSmallScreen ? "14px" : "16px",
                }}
              >
                Forgot Password
              </Link>
            </div>
            <div
              className="justify-content-start"
              style={{ textAlign: "left" }}
            >
              <Button
                href="/Login"
                style={{
                  backgroundColor: "#FCC822",
                  boxShadow:
                    " 0px 10.450244903564453px 23.22276496887207px -6.966829299926758px #FBE18F",
                  fontSize: "13px",
                  lineHeight: "14px",
                  width: "71px",
                  height: "37px",
                  fontWeight: 400,
                  font: "Poppins",
                  color: "black",
                  marginRight: "10px",
                }}
              >
                <b> Login</b>
              </Button>
              <Button
                href="/Signup"
                style={{
                  backgroundColor: "#FCC822",
                  color: "black",
                  boxShadow:
                    " 0px 10.450244903564453px 23.22276496887207px -6.966829299926758px #FBE18F",
                  fontSize: "13px",
                  lineHeight: "14px",
                  width: "71px",
                  height: "37px",
                  fontWeight: 400,
                  font: "Poppins",
                }}
              >
                Signup
              </Button>
            </div>
          </Box>
        </div>

        <div className="col-md-6">
          <img style={{ width: "100%" }} src={image} alt="Image" />
        </div>
      </div>
    </div>
  );
}
