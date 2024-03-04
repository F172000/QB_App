import React, { useState } from "react";
import { db } from "../firebase";
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

import { useNavigate } from "react-router-dom";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
} from "firebase/firestore";
import logo from "./images/header.png";
import { Navigate } from "react-router-dom";

const theme = createTheme();
export default function Login() {
  const Navigate = useNavigate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const login = async (e) => {
    e.preventDefault();

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in

        const user = userCredential.user;

        Navigate("/Profile");
        // ...
      })
      .catch((error) => {
        alert(error.message);
        setemail("");
        setpassword("");
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

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
          <img src={logo} width="70%" alt="Logo" />
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
              value={email}
              onChange={(e) => setemail(e.target.value)}
              style={{ paddingBottom: "10px" }}
            />
            <TextField
              fullWidth
              id="outlined-password-input"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
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
                onClick={login}
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
          {!isSmallScreen && (
            <img
              style={{ width: "100%", display: "block" }}
              src={image}
              alt="Image"
            />
          )}
        </div>
      </div>
    </div>
  );
}
