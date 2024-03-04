import {
  Avatar,
  Button,
  Card,
  FormControl,
  FormGroup,
  FormLabel,
  Select,
  TextField,
  useTheme,
  useMediaQuery,
  Typography,
} from "@mui/material";
import React from "react";
import Image from "./images/image.png";
import Navbar from "./navbar";
import Mainnavbar from "./navbarmain";
import footor from "./images/footor.png";
export default function Profile() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div style={{ marginTop: "100px" }}>
      <Mainnavbar />
      {/* <Card style={{ padding: 50 }}>
          <h6>General Setting </h6>
        </Card> */}
      <Card
        style={{
          padding: isSmallScreen ? 20 : 80, // Adjust padding based on screen size
          backgroundColor: "#A2C1E0",
          boxShadow: "0px 0px 0px 0px",
          "@media (max-width: 768px)": {
            padding: isSmallScreen ? 50 : 80, // Adjust padding for smaller screens
          },
        }}
      >
        {" "}
        <Typography
          style={{
            font: "Poppins",
            fontSize: isSmallScreen ? "1.7rem" : "2.8rem", // Relative font size

            fontWeight: 600,
            lineHeight: "67.5px",
            letterSpacing: "0em",
            textAlign: "left",
            marginBottom: isSmallScreen ? "1rem" : "3.125rem",
            color: " #333333",
          }}
        >
          My Profile
        </Typography>
        <Card
          style={{
            padding: isSmallScreen ? "1.7rem" : "3.125rem",
            backgroundColor: "#D4ECFF",
            borderRadius: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              // justifyContent: "space-between",
              alignItems: "center",
              padding: isSmallScreen ? "0rem" : "1.25rem",
            }}
          >
            <img
              src={Image}
              width="100rem"
              height={"100rem"}
              style={{
                borderRadius: "100px",
                marginBottom: 10,
                float: "center",
                marginRight: isSmallScreen ? 0 : 50,
              }}
            ></img>

            <Button
              className="d-flex justify-content-start"
              variant="contained"
              style={{
                backgroundColor: " #fcc822",
                color: "black",
                textAlign: "center",
                borderRadius: "100px",
                font: "Outfit",
                fontWeight: 500,
                fontSize: "10px",
                marginLeft: isSmallScreen ? "10px" : "30px",
                padding: "5px,16px,5px,16px",
                width: "93px",
                height: "23px",
                marginRight: "0px",
              }}
              component="label"
            >
              Upload
              <input hidden accept="image/*" multiple type="file" />
            </Button>
          </div>

          <div className="row">
            <Card
              style={{
                padding: "1.25rem",
                marginTop: isSmallScreen ? "0.5rem" : "1.875rem",
                backgroundColor: "#D4ECFF",
                border: "1px solid #00000026",
              }}
            >
              <Typography
                style={{
                  font: "Outfit",
                  fontSize: "12px",
                  fontWeight: 500,
                  lineHeight: "15px",
                  letterSpacing: "0em",
                  textAlign: "left",
                  color: "#1F1F1FB2",
                  marginTop: "13px",
                }}
              >
                Your Name
              </Typography>
              <div className="row">
                <div className="col-md-8">
                  <Typography
                    style={{
                      font: "Outfit",
                      fontSize: "12px",
                      fontWeight: 500,
                      marginTop: "7px",
                      lineHeight: "15px",
                      letterSpacing: "0em",
                      textAlign: "left",
                      color: "#222222E5",
                    }}
                  >
                    Sid
                  </Typography>
                </div>
                <div className="col-md-4">
                  <Button
                    variant="contained"
                    //color="#FCC822"
                    //size="small"
                    style={{
                      backgroundColor: " #fcc822",
                      color: "black",
                      textAlign: "center",
                      borderRadius: "72.66px",
                      font: "Outfit",
                      fontWeight: 500,
                      fontSize: "7.27px",
                      padding: "5px,16px,5px,16px",
                      width: "46px",
                      height: "18px",
                      marginTop: isSmallScreen ? "0.625em" : "0",
                      marginLeft: isSmallScreen ? "0em" : "25em", // Align to the right on large screens
                    }}
                    component="label"
                  >
                    Edit
                  </Button>
                </div>
              </div>
              <Typography
                style={{
                  font: "Outfit",
                  fontSize: "12px",
                  fontWeight: 500,
                  lineHeight: "15px",
                  letterSpacing: "0em",
                  textAlign: "left",
                  color: "#1F1F1FB2",
                  marginTop: "13px",
                }}
              >
                Phone Number
              </Typography>
              <div className="row">
                <div className="col-md-8">
                  <Typography
                    style={{
                      font: "Outfit",
                      fontSize: "12px",
                      fontWeight: 500,
                      lineHeight: "15px",
                      letterSpacing: "0em",
                      textAlign: "left",
                      color: "#222222E5",
                      marginTop: "7px",
                    }}
                  >
                    0987654321
                  </Typography>
                </div>
                <div className="col-md-4">
                  <Button
                    variant="contained"
                    //color="#FCC822"
                    //size="small"
                    style={{
                      backgroundColor: " #fcc822",
                      color: "black",
                      textAlign: "center",
                      borderRadius: "72.66px",
                      font: "Outfit",
                      fontWeight: 500,
                      fontSize: "7.27px",
                      padding: "5px,16px,5px,16px",
                      width: "46px",
                      height: "18px",
                      marginTop: isSmallScreen ? "0.625em" : "0",
                      marginLeft: isSmallScreen ? "0em" : "25em", // Align to the right on large screens
                    }}
                    component="label"
                  >
                    Edit
                  </Button>
                </div>
              </div>
              <Typography
                style={{
                  font: "Outfit",
                  fontSize: "12px",
                  fontWeight: 500,
                  lineHeight: "15px",
                  letterSpacing: "0em",
                  textAlign: "left",
                  color: "#1F1F1FB2",
                  marginTop: "13px",
                }}
              >
                Email
              </Typography>
              <div className="row">
                <div className="col-md-8">
                  <Typography
                    style={{
                      font: "Outfit",
                      marginTop: "7px",
                      fontSize: "12px",
                      fontWeight: 500,
                      lineHeight: "15px",
                      letterSpacing: "0em",
                      textAlign: "left",
                      color: "#222222E5",
                    }}
                  >
                    Sid987@gmail.com
                  </Typography>
                </div>
                <div className="col-md-4">
                  <Button
                    variant="contained"
                    //color="#FCC822"
                    //size="small"
                    style={{
                      backgroundColor: " #fcc822",
                      color: "black",
                      textAlign: "center",
                      borderRadius: "72.66px",
                      font: "Outfit",
                      fontWeight: 500,
                      fontSize: "7.27px",
                      padding: "5px,16px,5px,16px",
                      width: "46px",
                      height: "18px",
                      marginTop: isSmallScreen ? "0.625em" : "0",
                      marginLeft: isSmallScreen ? "0em" : "25em", // Align to the right on large screens
                    }}
                    component="label"
                  >
                    Edit
                  </Button>
                </div>
              </div>
              <Typography
                style={{
                  font: "Outfit",
                  fontSize: "12px",
                  fontWeight: 500,
                  lineHeight: "15px",
                  letterSpacing: "0em",
                  textAlign: "left",
                  color: "#1F1F1FB2",
                  marginTop: "13px",
                }}
              >
                Password
              </Typography>
              <div className="row">
                <div className="col-md-8">
                  <Typography
                    style={{
                      font: "Outfit",
                      fontSize: "12px",
                      fontWeight: 500,
                      lineHeight: "15px",
                      letterSpacing: "0em",
                      textAlign: "left",
                      marginTop: "7px",
                      color: "#222222E5",
                    }}
                  >
                    9876543456
                  </Typography>
                </div>
                <div className="col-md-4">
                  <Button
                    variant="contained"
                    //color="#FCC822"
                    //size="small"
                    style={{
                      backgroundColor: " #fcc822",
                      color: "black",
                      textAlign: "center",
                      borderRadius: "72.66px",
                      font: "Outfit",
                      fontWeight: 500,
                      fontSize: "7.27px",
                      padding: "5px,16px,5px,16px",
                      width: "46px",
                      height: "18px",
                      marginTop: isSmallScreen ? "0.625em" : "0",
                      marginLeft: isSmallScreen ? "0em" : "25em", // Align to the right on large screens
                    }}
                    component="label"
                  >
                    Edit
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </Card>
      </Card>
      <div>
        <img
          style={{
            marginTop: "50px",
            marginBottom: "25px",
            maxWidth: "100%",
            height: "auto",
          }}
          src={footor}
        />
      </div>
    </div>
  );
}
