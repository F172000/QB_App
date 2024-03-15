import React, { useState } from "react";
import { db } from "../config/firebase";
import TextField from "@mui/material/TextField";
import {
  Button,
  Box,
  Checkbox,
  useMediaQuery,
  createTheme,
  Link,
} from "@mui/material";
import image from "../assets/images/image.png";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';
import { signInWithEmailAndPassword } from "firebase/auth";
import { SignInUser } from "../redux/AuthThunk";
import logo from "../assets/images/header.png";
import { useDispatch,useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";

const theme = createTheme();
export default function Login() {
  const dispatch=useDispatch();
  const {user,authLoading}=useSelector((state)=>state.auth);
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");


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
            <form onSubmit={async(e)=>{
              e.preventDefault();
              dispatch(SignInUser({email,password})); 
            }}>
            <TextField
              fullWidth
              required
              id="outlined-basic"
              label="Email Address"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              style={{ paddingBottom: "10px" }}
            />
            <TextField
              fullWidth
              required
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
               type="submit"
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
                {authLoading? <Spinner size="sm"/>:"Login"}
              </Button>
              <Button
                onClick={()=>navigate('/signup')}
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
            </form>
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
