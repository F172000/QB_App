import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import {
  Button,
  Box,
  Checkbox,
  Link,
  Stack,
  Typography,
  IconButton,
  useMediaQuery,
  createTheme,
  Card,
  CardContent,
  CardMedia,
  Container,
  styled,CircularProgress
} from "@mui/material";

import Footer from "./footer";
import {toast} from 'react-toastify';
import "../assets/css/style.css";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import LiveHelpOutlinedIcon from "@mui/icons-material/LiveHelpOutlined";
import Mainnavbar from "./navbarmain";
import {getQuestionBanks} from '../redux/questionBankThunk';
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const theme = createTheme();

export default function Testknowledge() {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [numberOfQuestions, setNumberOfQuestions] = useState('');
  console.log(numberOfQuestions,"no of questions");
  const {Banks,loading}=useSelector((state)=>state.questionBanks);
  const [SelectedQuestionBank,setSelectedQuestionBank]=useState('');
  console.log(Banks,"questionBanks");
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  useEffect(()=>{
   dispatch(getQuestionBanks());
  },[])
  const handleSearch = () => {
    // Implement your search logic here
    // Filter the rows based on the searchTerm
    // const filteredRows = rows.filter((row) =>
    //   row.questionBankName.toLowerCase().includes(searchTerm.toLowerCase())
    // );
    // Log the filtered rows or update the state as needed
    // console.log("Filtered Rows:", filteredRows);
  };
  const handleTest=()=>{
    const selectedBank = Banks.find(bank => bank.id === SelectedQuestionBank);
    if (selectedBank) {
      const questions = selectedBank.questions;
      const totalQuestions = questions.length;
      const numToSelect = parseInt(numberOfQuestions);
  
      // Ensure numToSelect is a valid number and is not greater than totalQuestions
      if (!isNaN(numToSelect) && numToSelect > 0 && numToSelect <= totalQuestions) {
        // Randomly select numToSelect questions
        const selectedIndices = [];
        while (selectedIndices.length < numToSelect) {
          const randomIndex = Math.floor(Math.random() * totalQuestions);
          if (!selectedIndices.includes(randomIndex)) {
            selectedIndices.push(randomIndex);
          }
        }
  
        // Retrieve the selected questions
        const selectedQuestions = selectedIndices.map(index => questions[index]);
  
        // Shuffle the selected questions
        const shuffledQuestions = selectedQuestions.sort(() => Math.random() - 0.5);
        navigate("/Quiz", { state: { questions: shuffledQuestions } });
      } else {
        toast.error("Invalid number of questions to select.");
      }
    } else {
      toast.error("Selected question bank not found.");
    }
  }

  return (
    <div>
      <div
        className="main-container"
        style={{
          overflow: "hidden",
          marginTop: "100px",
          // @media (max-width: 768px) {
          // {
          //     padding: "0px" /* Adjust the padding value as needed */
          // }

          //   /* Additional mobile styles if necessary */
          // }
        }}
      >
        <Mainnavbar />
        <div className="row m-4 ">
          <div className="col-md-7 col-sm-7">
            <Typography
              style={{
                fontWeight: 500,
                lineHeight: isSmallScreen ? "35px" : "41px",
                fontSize: isSmallScreen ? "25px" : "35px", // Relative font size
                color: "#333333",
                font: "Roboto",
                //  marginLeft: 40,
                marginTop: "20px",
                //marginBottom: "20px",
                //textAlign: "center",
              }}
            >
              Choose your Question Bank
            </Typography>
          </div>
          <div className="col-md-5 col-sm-5 d-flex justify-content-end">
            <Stack direction="row" spacing={1} style={{ marginTop: "20px" }}>
              {isSearchVisible && (
                <Box>
                  <TextField
                    // variant="outlined"
                    size="small"
                    fullWidth
                    //color="black"
                    style={{ color: "black" }}
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onBlur={() => setIsSearchVisible(false)}
                    autoFocus
                  />
                </Box>
              )}
              <IconButton
                style={{ padding: "0px" }}
                onClick={() => setIsSearchVisible(!isSearchVisible)}
              >
                <SearchIcon
                  // fontSize="large"
                  style={{ color: "#000000", fontSize: "40px" }}
                />
              </IconButton>
              {/* <SearchIcon fontSize="large" /> */}
              <MenuIcon style={{ color: "#000000", fontSize: "40px" }} />
            </Stack>
          </div>
        </div>
        <Container
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            marginTop: isSmallScreen ? "50px" : "4px",
            padding: "0 10px", // Add padding for all screens
            "@media (max-width: 768px)": {
              justifyContent: "center", // Center the items for smaller screens
              padding: "0", // Remove padding for smaller screens
              // marginTop: "10px",
              justifyContent: "none",
              width: "80%",
            },
          }}
        >
          {/* Card 1 */}
          {loading ? (
          <div className="col-12 justify-content-center d-flex pt-2 pb-2">
            {" "}
            <CircularProgress color="inherit" />
          </div>
        ) : Banks?.length > 0 && Banks?.map((item, index) => {
            return (
          <a  onClick={() => setSelectedQuestionBank(item.id)} style={{ textDecoration: "none" }} key={index}>
            <Card
              style={{
                marginBottom: isSmallScreen ? "30px" : "20px",
                textAlign: "center",
                width: isSmallScreen ? "350px" : "250px",
                height: isSmallScreen ? "250px" : " 300px",
                top: "318px",
                borderRadius: "20px",
                backgroundColor: "#D4ECFF",
                boxShadow:  SelectedQuestionBank === item?.id
                ? "0px 5px 5px 5px #D9ECFF80"
                : "0px 4px 4px 0px #D9ECFF80",
                "@media (max-width: 768px)": {
                  padding: "0", // Remove padding for smaller screens
                  marginLeft: "20px",
                },
              }}
            >
              <Container
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  marginTop: "50px",
                }}
              >
                {/* Yellow Box */}
                <Box
                  style={{
                    height: isSmallScreen ? "80px" : "90px",
                    width: isSmallScreen ? "100px" : "90px",
                    borderRadius: "8px",
                    backgroundColor: "#FCC832",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "20px",
                  }}
                >
                  <LiveHelpOutlinedIcon />
                </Box>
                {/* Text */}
                <div sx={{ textAlign: "center", paddingTop: "5px" }}>
                  <Typography variant="h6" gutterBottom>
                    Question Bank {index+1}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {item?.questions?.length} Questions
                  </Typography>
                </div>
              </Container>
            </Card>
          </a>
        )})}
{Banks?.length===0 &&
              <div className="d-flex flex-column justify-content-center align-items-center nodata">
              <small> No Question Bank Found</small>
              {/* <img className="w-25 h-25 " src={nodata} alt="nodata"></img> */}
            </div>}
          
        </Container>
        <div className="row m-4 ">
          <div className="col-md-8 col-sm-7 d-flex justify-content-center align-items-center">
            <TextField
              //fullWidth
              // id="outlined-basic"
              // label="Number of Questions"
              type="number"
              value={numberOfQuestions}
              onChange={(e)=>setNumberOfQuestions(e.target.value)}
              style={{
                width: "80%",
                paddingBottom: "10px",
                // marginLeft: "100px",
                color: " #1C1C1C",
              }}
            />
          </div>
          <div className="col-md-4 col-sm-5 d-flex justify-content-center">
            <Button
              style={{
                backgroundColor: " #fcc822",
                color: " #1c1c1c",
                borderRadius: "13px",
                font: "Poppins",
                //padding: "15px",
                lineHeight: "52.5px",
                fontWeight: 700,
                marginTop: isSmallScreen ? "13px" : "0px",
                fontSize: isSmallScreen ? "13px" : "15px",
                width: "250px",
                height: "60px",
                float: "right",
                // marginRight: "100px",
              }}
             onClick={handleTest}
            >
              Test My Knowledge
            </Button>
          </div>
        </div>{" "}
        <div>
          <Footer />
        </div>
      </div>
      {/* <style>
        {
          @media (max-width: 768px) {
            .main-container {
              padding: "10px", // Adjust the padding value as needed 
            }

          }
        }
      </style> */}
    </div>
  );
}
