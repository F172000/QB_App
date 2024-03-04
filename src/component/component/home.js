import React from "react";
import { Button } from "@mui/material";
import Navbar from "./navbar";
import footor from "./images/footor.png";

import { useMediaQuery, createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme();

export default function Home() {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <ThemeProvider theme={theme}>
      <div>
        <div style={{ marginTop: "100px" }}>
          <Navbar />

          <div>
            <p
              style={{
                fontFamily: "Poppins",
                fontSize: isSmallScreen ? "1rem" : "1.5rem",
                fontWeight: 600,
                lineHeight: isSmallScreen ? 2 : 1.5,
                letterSpacing: "0em",
                textAlign: "center",
                margin: isSmallScreen ? 0 : "50px",
                padding: isSmallScreen ? "1rem" : "2rem",
                wordWrap: "break-word",
                maxWidth: "100%",
              }}
            >
              QBApp is a website designed to support your learning. Either
              upload your own question bank, or have our AI produce one for you.
              Research shows that answering questions is highly effective as a
              learning technique. It is the most effective way to prepare for
              any examination.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <Button
                href="/Uploadquebank"
                style={{
                  backgroundColor: "#fcc822",
                  color: "black",
                  borderRadius: "20px",
                  font: "Poppins",

                  lineHeight: isSmallScreen ? 2 : 1.5,
                  padding: isSmallScreen ? "0.9rem" : "1.0rem",
                  lineHeight: isSmallScreen ? "18px" : "24px",
                  fontWeight: 700,
                  fontSize: isSmallScreen ? "0.85rem" : "1.05rem",
                  margin: "10px",
                  width: "100%",
                  maxWidth: isLargeScreen ? "30%" : "100%",
                  textAlign: "center",
                }}
              >
                UPLOAD YOUR OWN QUESTION<br></br> BANK(.XLS)
              </Button>

              <Button
                href="/Testknowledge"
                style={{
                  backgroundColor: "#fcc822",
                  color: "black",
                  borderRadius: "20px",
                  font: "Poppins",

                  lineHeight: isSmallScreen ? "24px" : "24px",
                  padding: isSmallScreen ? "0.9rem" : "1.0rem",
                  // lineHeight: "24px",
                  fontWeight: 700,
                  fontSize: isSmallScreen ? "0.85rem" : "1.05rem",
                  margin: "10px",
                  width: "100%",
                  maxWidth: isLargeScreen ? "30%" : "100%",
                  textAlign: "center",
                }}
              >
                TEST MY KNOWLEDGE
              </Button>

              <Button
                style={{
                  backgroundColor: "#fcc822",
                  color: "black",
                  borderRadius: "20px",
                  font: "Poppins",
                  lineHeight: isSmallScreen ? "18px" : "24px",
                  padding: isSmallScreen ? "0.9rem" : "1.0rem",
                  // lineHeight: "24px",
                  fontWeight: 700,
                  fontSize: isSmallScreen ? "0.85rem" : "1.05rem",
                  margin: "10px",
                  width: "100%",
                  maxWidth: isLargeScreen ? "30%" : "100%",
                  textAlign: "center",
                }}
                href="/Aibank"
              >
                ASK AI TO CREATE QUESTION BANK FROM YOUR DOCUMENT(.PDF OR .DOC)
              </Button>
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
              alt="Footor"
            />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
