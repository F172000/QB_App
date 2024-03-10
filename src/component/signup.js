import { db } from "../config/firebase";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import {
  Button,
  createTheme,
  Box,
  Typography,
  useMediaQuery,
} from "@mui/material";
import image from "../assets/images/image.png";
import logo from "../assets/images/header.png";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
} from "firebase/firestore";

import { useNavigate,Link } from "react-router-dom";

const theme = createTheme();
export default function Signup() {
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const signup = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user.uid;
      navigate("/profile");
      console.log(user);
      const docRef = await addDoc(collection(db, "users"), {
        uid: user,
        name: name,
        phone: phone,
        email: email,
        password: password,
      });

      alert("User created successfully");
    } catch (error) {
      console.error("Error creating user: ", error);
      alert("Error creating user: " + error.message);
    }
  };
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div style={{ overflow: "hidden" }}>
      <div className="row">
        <div
          className="col-md-6"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            paddingTop: "100px",
          }}
        >
          <img src={logo} width="70%" alt="Logo" />
          <br />
          <div>
            <p
              style={{
                paddingTop: "30px",
                lineHeight: "22.5px",
                fontSize: "15px",
              }}
            >
              Welcome back!
              <br /> Please Login/Signup to your account.
            </p>
          </div>

          <Box
            sx={{
              width: "80%",
              maxWidth: "100%",
              padding: "9px",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              paddingLeft: "15px",
            }}
          >
            <TextField
              fullWidth
              id="outlined-basic"
              label="Name"
              value={name}
              onChange={(e) => setname(e.target.value)}
              style={{ paddingBottom: "10px" }}
            />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Phone Number"
              type="number"
              value={phone}
              onChange={(e) => setphone(e.target.value)}
              style={{ paddingBottom: "10px" }}
            />

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
            <Typography
              style={{
                fontWeight: 400,
                fontSize: "12px",
                textAlign: "left",
                marginBottom: "20px",
                marginTop: "10px",
              }}
            >
              To help with hosting fees, a small payment (£1.50) is due on
              signup. This covers your contribution to the site costs for 12
              months.
            </Typography>
            <div
              className="justify-content-start"
              style={{ textAlign: "left" }}
            >
              <Button
                onClick={signup}
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
                <b>Signup</b>
              </Button>{" "}
              <Button
                onClick={() => navigate("/")}
                style={{
                  backgroundColor: "#FCC822",
                  color: "black",
                  marginRight: "10px",
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
                Login
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
