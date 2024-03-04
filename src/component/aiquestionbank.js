import React from "react";
import {
  Container,
  Typography,
  Button,
  FormControl,
  OutlinedInput,
  InputAdornment,
  useMediaQuery,
  createTheme,
  Box,
} from "@mui/material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import AttachmentIcon from "@mui/icons-material/Attachment";
import Navbar from "./navbar";
import Mainnavbar from "./navbarmain";
import footor from "./images/footor.png";

import Footer from "./footer";

const theme = createTheme();

export default function Aibank() {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div style={{ marginTop: "100px" }} className="footerfix">
      <Mainnavbar />
      <Container
        maxWidth="md"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: isSmallScreen ? "20px" : "50px",
            backgroundColor: " #D4ECFF",
            boxShadow: "0px 4px 4px 0px #D9ECFF80",
            justifyContent: "center",
            marginTop: "50px",
            borderRadius: "20px",
            margin: isSmallScreen ? "25px" : "30px",
            height: isSmallScreen ? "75vh" : "700px",
            width: isSmallScreen ? "395px" : "1000px",
          }}
        >
          <Typography
            className="m-2"
            variant="h4"
            style={{
              fontWeight: 600,
              fontSize: isSmallScreen ? "1.5rem" : "2.8rem", // Relative font size
              color: "#333333",
              fontFamily: "Poppins",
              lineHeight: isSmallScreen ? "1.5rem" : "3.15rem",
              textAlign: "center",
            }}
          >
            Use AI to Generate a QB
          </Typography>
          <Box
            style={{
              height: isSmallScreen ? "70vh" : "400px",
              width: isSmallScreen ? "345px" : "900px",
              borderRadius: "12px",
              backgroundColor: "#a3c1dd",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "20px 0",
            }}
          >
            {/* Internal Box Content Goes Here */}
          </Box>
          <FormControl
            // standard="filled"
            fullWidth
          >
            <OutlinedInput
              id="outlined-adornment-weight"
              placeholder="Type your message"
              style={{
                backgroundColor: "#a3c1dd",
                height: isSmallScreen ? "50px" : "55px",
                width: isSmallScreen ? "345px" : "900px",
                borderRadius: "18px",
                focused: "none",
                fontSize: "18px",
                notchedOutline: "none",
                border: "none",
              }}
              endAdornment={
                <InputAdornment position="end">
                  <AttachmentIcon
                    //    fontSize="large"
                    style={{ color: "#ffffff" }}
                  />
                  <DoubleArrowIcon
                    //  fontSize="large"
                    style={{ color: "#ffffff", marginRight: "20px" }}
                  />
                </InputAdornment>
              }
              inputProps={{
                "aria-label": "weight",
              }}
            />
          </FormControl>{" "}
        </Box>
      </Container>
      <div>
        <Footer />
      </div>
    </div>
  );
}
