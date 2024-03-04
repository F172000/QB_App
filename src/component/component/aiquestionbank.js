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

const theme = createTheme();

export default function Aibank() {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div style={{ marginTop: "100px" }}>
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
            height: isSmallScreen ? "350px" : "700px",
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
              height: isSmallScreen ? "200px" : "400px",
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
            // style={{
            //   backgroundColor: "#a3c1dd",
            //   height: "4.0vw",
            //   width: "65.8vw",
            // borderRadius: "8px",
            //marginTop: "20px",
            // borderBlockStyle: "none",
            // }}
          >
            {/* <InputAdornment position="end">
                  <AttachmentIcon
                    //    fontSize="large"
                    style={{ color: "#ffffff" }}
                  />
                  <DoubleArrowIcon
                    //  fontSize="large"
                    style={{ color: "#ffffff", marginRight: "20px" }}
                  />
                </InputAdornment> */}

            <OutlinedInput
              id="outlined-adornment-weight"
              placeholder="Type your message"
              style={{
                backgroundColor: "#a3c1dd",
                height: isSmallScreen ? "30px" : "55px",
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

// import React from "react";
// import {
//   Container,
//   Typography,
//   Button,
//   FormControl,
//   OutlinedInput,
//   InputAdornment,
//   Box,
// } from "@mui/material";
// import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
// import AttachmentIcon from "@mui/icons-material/Attachment";
// import Navbar from "./navbar";
// import Mainnavbar from "./navbarmain";
// import footor from "./images/footor.png";

// export default function Aibank() {
//   return (
//     <div style={{ marginTop: "100px" }}>
//       <Mainnavbar />
//       <Container
//         maxWidth="md"
//         style={{ display: "flex", justifyContent: "center" }}
//       >
//         <Box
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             padding: "1vw", // Use relative units for padding
//             backgroundColor: " #D4ECFF",
//             boxShadow: "0px 4px 4px 0px #D9ECFF80",
//             justifyContent: "center",
//             marginTop: "5vw", // Use relative units for margin
//             borderRadius: "2vw", // Use relative units for border-radius
//             width: "90vw", // Use relative units for width
//           }}
//         >
//           <Typography
//             className="m-4"
//             variant="h4"
//             style={{
//               fontWeight: 600,
//               fontSize: "4vw", // Use relative units for font-size
//               color: "#333333",
//               fontFamily: "Poppins",
//               lineHeight: "6vw", // Use relative units for line-height
//               textAlign: "center",
//             }}
//           >
//             Use AI to Generate a QB
//           </Typography>
//           <Box
//             style={{
//               height: "30vw", // Use relative units for height
//               width: "80vw", // Use relative units for width
//               borderRadius: "2vw", // Use relative units for border-radius
//               backgroundColor: "#a3c1dd",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               margin: "4vw 0", // Use relative units for margin
//             }}
//           >
//             {/* Internal Box Content Goes Here */}
//           </Box>
//           <FormControl
//             standard="filled"
//             fullWidth
//             style={{
//               backgroundColor: "#a3c1dd",
//               height: "5vw", // Use relative units for height
//               width: "80vw", // Use relative units for width
//               marginTop: "4vw", // Use relative units for margin
//             }}
//           >
//             <OutlinedInput
//               id="outlined-adornment-weight"
//               placeholder="Type your message"
//               endAdornment={
//                 <InputAdornment position="end">
//                   <AttachmentIcon
//                     fontSize="4vw" // Use relative units for font-size
//                     style={{ color: "#ffffff" }}
//                   />
//                   <DoubleArrowIcon
//                     fontSize="4vw" // Use relative units for font-size
//                     style={{ color: "#ffffff", marginRight: "2vw" }} // Use relative units for margin
//                   />
//                 </InputAdornment>
//               }
//               inputProps={{
//                 "aria-label": "weight",
//               }}
//               style={{
//                 focused: "none",
//                 notchedOutline: "none",
//                 border: "none",
//               }}
//             />
//           </FormControl>{" "}
//         </Box>
//       </Container>
//       <div>
//         <img
//           style={{
//             marginTop: "5vw", // Use relative units for margin
//             marginBottom: "2.5vw", // Use relative units for margin
//             maxWidth: "100%",
//             height: "auto",
//           }}
//           src={footor}
//         />
//       </div>
//     </div>
//   );
// }
