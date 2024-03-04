import React from "react";
import TextField from "@mui/material/TextField";
import {
  Button,
  Box,
  Checkbox,
  Link,
  useMediaQuery,
  createTheme,
  Stack,
  CardActionArea,
  Chip,
  Typography,
} from "@mui/material";
import image from "./images/image.png";
import logo from "./images/logo.png";
import Navbar from "./navbar";
import pay from "./images/mobile-payment 1.png";
import { Card } from "react-bootstrap";
import Mainnavbar from "./navbarmain";
import footor from "./images/footor.png";

const theme = createTheme();
export default function Uploads1() {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div>
      <div style={{ overflow: "hidden", marginTop: "100px" }}>
        <Mainnavbar />

        <div
          className="row"
          style={{
            marginLeft: isSmallScreen ? "20px" : "50px",
            marginRight: isSmallScreen ? "20px" : "50px",
            marginTop: isSmallScreen ? "5px" : "30px",
          }}
        >
          <div
            className="col-md-6"
            style={{ paddingBottom: isSmallScreen ? "0.1rem" : "1.875rem" }}
          >
            <img
              src={pay}
              style={{
                width: isSmallScreen ? " 6.5rem" : "9.375rem",
                height: isSmallScreen ? " 7.0rem" : "10rem",
              }}
            ></img>
            <p
              style={{
                color: " #333333",
                font: "Poppins",
                padding: "1px",
                lineHeight: isSmallScreen ? "2.5rem" : "3.15rem",
                fontWeight: 700,
                fontSize: isSmallScreen ? "1.7rem" : "2.8rem", // Relative font size
              }}
            >
              Please make a small contribution to hosting costs for this site.
            </p>
            <p
              style={{
                //marginLeft: "20px",
                color: " #333333",
                //        borderRadius: "13px",
                font: "Poppins",
                // padding: "15px",
                lineHeight: "27.5px",
                fontWeight: 400,
                fontSize: isSmallScreen ? "1.0rem" : "1.25rem", // Relative font size
              }}
            >
              Thank you for choosing to upload a Question Bank! Before
              proceeding, a small fee is required to cover the processing and
              integration of your questions.
            </p>
          </div>
          <div className="col-md-6">
            <Card
              style={{
                padding: isSmallScreen ? "0.7rem" : "2.25rem",
                backgroundColor: "#D4ECFF",
                borderRadius: "20px",
                marginRight: "20px",
                marginTop: isSmallScreen ? "1rem" : "4.5rem",
              }}
            >
              <a href="/Uploads2" style={{ textDecoration: "none" }}>
                <Typography
                  component="div"
                  variant="body1"
                  style={{
                    //marginLeft: "20px",
                    color: "#1C1C1C",
                    font: "Poppins",
                    backgroundColor: "#fcc822",
                    padding: "20px",
                    borderRadius: "13px",
                    margin: "5px",
                    lineHeight: isSmallScreen ? "0" : "1.25rem",
                    textAlign: "center",
                    fontWeight: 700,
                    fontSize: isSmallScreen ? "0.7rem" : "0.87rem",
                  }}
                >
                  Pay with Credit/debit Card
                </Typography>
              </a>
              <Typography
                component="div"
                variant="body1"
                style={{
                  // marginLeft: "20px",
                  color: "#1C1C1C",
                  font: "Poppins",
                  backgroundColor: "#fcc822",
                  padding: "20px",
                  borderRadius: "13px",
                  margin: "5px",
                  lineHeight: isSmallScreen ? "0" : "1.25rem",
                  textAlign: "center",
                  fontWeight: 700,
                  fontSize: isSmallScreen ? "0.7rem" : "0.87rem",
                }}
              >
                Pay with PAYPAL
              </Typography>
              <Typography
                component="div"
                variant="body1"
                style={{
                  //marginLeft: "20px",
                  color: "#1C1C1C",
                  font: "Poppins",
                  backgroundColor: "#fcc822",
                  padding: "20px",
                  borderRadius: "13px",
                  margin: "5px",
                  lineHeight: isSmallScreen ? "0" : "1.25rem",
                  textAlign: "center",
                  fontWeight: 700,
                  fontSize: isSmallScreen ? "0.7rem" : "0.87rem",
                }}
              >
                Pay with GPAY
              </Typography>
              <Typography
                component="div"
                variant="body1"
                style={{
                  //marginLeft: "20px",
                  color: "#1C1C1C",
                  font: "Poppins",
                  backgroundColor: "#fcc822",
                  padding: "20px",
                  borderRadius: "13px",
                  margin: "5px",
                  lineHeight: isSmallScreen ? "0" : "1.25rem",
                  textAlign: "center",
                  fontWeight: 700,
                  fontSize: isSmallScreen ? "0.7rem" : "0.87rem",
                }}
              >
                Pay with APPLE PAY
              </Typography>
            </Card>
          </div>
        </div>
        <div>
          <img
            style={{ marginTop: "50px", marginBottom: "25px" }}
            src={footor}
          />
        </div>
      </div>
    </div>
  );
}
