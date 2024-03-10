import { db } from "../config/firebase";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import {
  Button,
  createTheme,
  Box,
  Typography,
  useMediaQuery
} from "@mui/material";
import image from "../assets/images/image.png";
import logo from "../assets/images/header.png";
import { RegisterUser } from "../redux/AuthThunk";
import { useNavigate,Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Spinner } from "react-bootstrap";
const theme = createTheme();
export default function Signup() {
  const dispatch=useDispatch();
  const navigate = useNavigate();
  const [loading,setloading]=useState(false);
  const [Name, setName] = useState("");
  const [Phone, setPhone] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
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
            <form onSubmit={(e)=>{
              e.preventDefault();
              dispatch(
                RegisterUser(
                  Name,
                  Email,
                  Phone,
                  Password,
                  setloading
                )
              );
            }}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Name"
              required
              value={Name}
              onChange={(e) => setName(e.target.value)}
              style={{ paddingBottom: "10px" }}
            />
            <TextField
              fullWidth
              id="outlined-basic"
              required
              label="Phone Number"
              type="number"
              sx={{
                "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                                         display: "none",
                                       },
               "& input[type=number]": {
                                         MozAppearance: "textfield",
                                       },
               }}
              value={Phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{ paddingBottom: "10px" }}
            />

            <TextField
              fullWidth
              required
              id="outlined-basic"
              label="Email Address"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ paddingBottom: "10px" }}
            />
            <TextField
              fullWidth
              required
              id="outlined-password-input"
              label="Password"
              type="password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
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
               type="submit"
               disabled={loading}
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
                {loading? <Spinner size="sm"/>:"Signup"}
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
