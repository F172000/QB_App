import React from "react";
import TextField from "@mui/material/TextField";
import { Button, Box, Typography } from "@mui/material";
import image from "./images/image.png";
import logo from "./images/logo.png";

export default function Signup() {
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
          <img src={logo} alt="Logo" />
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
              style={{ paddingBottom: "10px" }}
            />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Phone Number"
              type="number"
              style={{ paddingBottom: "10px" }}
            />

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
                href="/Payments1"
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
                href="/Login"
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
          <img style={{ width: "100%" }} src={image} alt="Image" />
        </div>
      </div>
    </div>
  );
}
