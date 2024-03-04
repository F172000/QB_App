import React, { useRef } from "react";
import TextField from "@mui/material/TextField";
import footor from "./images/footor.png";
import { styled } from "@mui/material/styles";
import {
  Button,
  useMediaQuery,
  createTheme,
  Box,
  Checkbox,
  Link,
  Divider,
  Typography,
} from "@mui/material";
import image from "./images/image.png";
import logo from "./images/logo.png";
import upload from "./images/upload (1) 1.png";
import Payments1 from "./paymentscreen1";
import Mainnavbar from "./navbarmain";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const theme = createTheme();

export default function Uploadquebank() {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const fileInputRef = useRef(null);

  const handleFileUpload = () => {
    // Trigger the hidden file input when the button is clicked
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    // Handle the selected file here
    const selectedFile = e.target.files[0];
    console.log("Selected file:", selectedFile);
  };
  return (
    <div style={{ overflow: "hidden", marginTop: "100px" }}>
      <Mainnavbar></Mainnavbar>
      <div className="row p-4">
        <div className="col-md-8 col-sm-8">
          <h2
            style={{
              //    backgroundColor: " #fcc822",
              color: " #333333",
              borderRadius: "13px",
              font: "Poppins",
              padding: isSmallScreen ? 3 : "15px",
              lineHeight: isSmallScreen ? 1.4 : 1.5,
              fontWeight: 600,
              fontSize: isSmallScreen ? "1.7rem" : "2.8rem", // Relative font size
              textAlign: "left",
              marginLeft: isSmallScreen ? 0 : 20,
            }}
          >
            Upload a Question Bank
          </h2>
          <Divider
            sx={{
              width: "135px",
              height: "6px",
              border: "solid 2px #FCC832",
              color: "#FCC832",
              backgroundColor: "#FCC832",
              textAlign: "left", // Adjust as needed
              marginLeft: isSmallScreen ? 0 : "30px", // Adjust as needed
            }}
          />
          <div
            style={{
              marginTop: isSmallScreen ? "2.5rem" : "4.5rem",
              marginLeft: isSmallScreen ? "0rem" : "1.5rem", // Relative padding
              color: " #333333",
              //        borderRadius: "13px",
              font: "Poppins",
              padding: "15px",
              lineHeight: "27.5px",
              fontWeight: 400,
              //  fontSize: isSmallScreen ? "1.2rem" : "1.3rem", // Relative font size
            }}
          >
            <Typography
              style={{
                marginBottom: "30px",
                fontSize: isSmallScreen ? "1.2rem" : "1.3rem",
              }}
            >
              1. Before uploading, please ensure your .xls file follows our
              formatting guidelines. You can find detailed instructions here on
              how to structure your files.
            </Typography>
            <Typography
              style={{
                marginBottom: "30px",
                fontSize: isSmallScreen ? "1.2rem" : "1.3rem",
              }}
            >
              2. Name your Question Bank: Please use the following naming
              convention as this will help organize your question banks
              efficiently. Example: "Biology_Quiz_Questions_Jan2023"
            </Typography>
            <Typography
              style={{ fontSize: isSmallScreen ? "1.2rem" : "1.3rem" }}
            >
              3. Upload your file, and you're all set! Your questions will be
              integrated into the database, ready for users to access.
            </Typography>
          </div>
        </div>
        <div className="col-md-4 col-sm-4 mt-4">
          <Button
            style={{
              backgroundColor: " #fcc822",
              color: " #2E3899",
              borderRadius: "13px",
              font: "Poppins",
              // padding: "15px",
              lineHeight: "52.5px",
              fontWeight: 700,
              fontSize: "13.93px",
              width: "224px",
              height: "48px",
              float: "left",
              marginLeft: isSmallScreen ? "2.5rem" : "5.5rem",
              padding: isSmallScreen ? "1rem" : "1.5rem", // Relative padding
            }}
            href="/Questionbank"
          >
            MY QUESTION BANK
            <VisuallyHiddenInput type="file" />
          </Button>
          <div
            className="row"
            style={{
              marginTop: "100px",
              //  borderRadius: "100px",
              //marginBottom: 10,
              //float: "center",
              marginLeft: isSmallScreen ? "2.0rem" : "2.5rem",
            }}
          >
            <div className="col-md-12">
              <label htmlFor="fileInput">
                <a href="/Uploads1">
                  <img
                    src={upload}
                    width="220px"
                    height="220px"
                    style={{ marginTop: isSmallScreen ? "0px" : "50px" }}
                    //onClick={Payments1}
                  />
                </a>
              </label>
            </div>
            <div className="row">
              <span
                style={{
                  font: "Poppins",
                  fontWeight: 400,
                  fontSize: "20px",
                  marginLeft: isSmallScreen ? "2.0rem" : "2.5rem",
                }}
              >
                Upload .xlx file
              </span>
            </div>
          </div>
        </div>
      </div>
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
