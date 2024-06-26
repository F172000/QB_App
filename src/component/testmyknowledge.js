import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  FreeMode,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/free-mode";
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
  styled,
  CircularProgress,
} from "@mui/material";

import Footer from "./footer";
import { toast } from "react-toastify";
import "../assets/css/style.css";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import LiveHelpOutlinedIcon from "@mui/icons-material/LiveHelpOutlined";
import Mainnavbar from "./navbarmain";
import { getQuestionBanks,getQuestionBanksBySearchTerm } from "../redux/questionBankThunk";
import { getQuizQuestions } from "../redux/quizQuestionThunk";
import {
  resetQuestionsAnswers,
  resetQuizQuestions,
} from "../redux/quizQuestionSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const theme = createTheme();

export default function Testknowledge() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [numberOfQuestions, setNumberOfQuestions] = useState("");
  console.log(numberOfQuestions, "no of questions");
  const { Banks, loading } = useSelector((state) => state.questionBanks);
  const [SelectedQuestionBank, setSelectedQuestionBank] = useState("");
  console.log(Banks, "questionBanks");
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  useEffect(() => {
    dispatch(getQuestionBanks());
    dispatch(resetQuestionsAnswers());
    dispatch(resetQuizQuestions());
  }, []);
  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      const context = this;
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(context, args), delay);
    };
  };
  const handleSearch = (searchTerm) => {
    console.log('Searching for:', searchTerm);
    if(searchTerm===''){
      dispatch(getQuestionBanks());
    }
    else{
    dispatch(getQuestionBanksBySearchTerm(searchTerm));
    }
  };
  const debouncedSearch = debounce(handleSearch, 300); // Adjust delay as needed (e.g., 300ms)
  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    debouncedSearch(value);// Trigger debounced search
  };
  const handleTest = async () => {
    const selectedBank = Banks.find((bank) => bank.id === SelectedQuestionBank);
    if (selectedBank) {
      const questions = selectedBank.questions;
      const totalQuestions = questions.length;
      const numToSelect = parseInt(numberOfQuestions);

      // Ensure numToSelect is a valid number and is not greater than totalQuestions
      if (
        !isNaN(numToSelect) &&
        numToSelect > 0 &&
        numToSelect <= totalQuestions
      ) {
        // Randomly select numToSelect questions
        const selectedIndices = [];
        while (selectedIndices.length < numToSelect) {
          const randomIndex = Math.floor(Math.random() * totalQuestions);
          if (!selectedIndices.includes(randomIndex)) {
            selectedIndices.push(randomIndex);
          }
        }

        // Retrieve the selected questions
        const selectedQuestions = selectedIndices.map(
          (index) => questions[index]
        );

        // Shuffle the selected questions
        const shuffledQuestions = selectedQuestions.sort(
          () => Math.random() - 0.5
        );
        await dispatch(getQuizQuestions(shuffledQuestions));
        navigate("/Quiz");
      } else {
        toast.error("Invalid number of questions to select.");
      }
    } else {
      toast.error("Selected question bank not found.");
    }
  };

  return (
    <div>
      <div
        className="main-container"
        style={{
          overflow: "hidden",
          marginTop: "100px",
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
                    onChange={(e) => handleChange(e)}
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
          {/* Card 1 */}

          <div className="container px-6 py-2 justify-content-center">
            <Swiper
              className="px-5 py-5"
              modules={[Navigation, Pagination, Scrollbar, A11y, FreeMode]}
              breakpoints={{
                0: {
                  spaceBetween: 10,
                  slidesPerView: 1,
                },
                480: {
                  spaceBetween: 10,
                  slidesPerView: 2,
                },
                768: {
                  spaceBetween: 20,
                  slidesPerView: 3,
                },
                1024: {
                  spaceBetween: 30,
                  slidesPerView: 4,
                },
              }}
              navigation
              freeMode={true}
              grabCursor={true}
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={() => console.log("slide change")}
            >
              {loading ? (
                <div className="col-12 justify-content-center d-flex pt-2 pb-2">
                  {" "}
                  <CircularProgress color="inherit" />
                </div>
              ) : (
                Banks?.length > 0 &&
                Banks?.map((item, index) => {
                  return (
                    <SwiperSlide >
                      <a
                        onClick={() => setSelectedQuestionBank(item.id)}
                        style={{ textDecoration: "none" }}
                        key={index}
                      >
                        <Card 
                          style={{
                            marginBottom: isSmallScreen ? "30px" : "20px",
                            textAlign: "center",
                            height: isSmallScreen ? "250px" : " 300px",
                            top: "318px",
                            borderRadius: "20px",
                            backgroundColor: "#D4ECFF",
                            boxShadow:
                              SelectedQuestionBank === item?.id
                                ? "0px 5px 5px 5px #F3F5D2"
                                : "0px 4px 4px 0px #D9ECFF80",
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
                            <div
                              sx={{ textAlign: "center", paddingTop: "5px" }}
                            >
                              {/* <Typography variant="h5" gutterBottom>
                               {item?.name}
                              </Typography> */}
                               <h6>
                               {item?.name}
                              </h6>
                              <small>{item?.username||""}</small>
                              <Typography variant="body2" color="textSecondary">
                                {item?.questions?.length} Questions
                              </Typography>
                            </div>
                          </Container>
                        </Card>
                      </a>
                    </SwiperSlide>
                  );
                })
              )}
            </Swiper>
            {Banks?.length === 0 && (
            <div className="d-flex flex-column justify-content-center align-items-center nodata">
              <small> No Question Bank Found</small>
              {/* <img className="w-25 h-25 " src={nodata} alt="nodata"></img> */}
            </div>
          )}
          </div>
          {/* {Banks?.length === 0 && (
            <div className="d-flex flex-column justify-content-center align-items-center nodata">
              <small> No Question Bank Found</small>
            </div>
          )} */}
        <div className="row m-4 ">
          <div className="col-md-8 col-sm-7 d-flex justify-content-center align-items-center">
            <TextField
              //fullWidth
              // id="outlined-basic"
              // label="Number of Questions"
              placeholder="Enter number of questions to test your knowledge..."
              type="number"
              value={numberOfQuestions}
              onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
              style={{
                width: "80%",
                paddingBottom: "10px",
                // marginLeft: "100px",
                color: " #1C1C1C]",
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
        {/* <div>
          <Footer />
        </div> */}
      </div>
    </div>
  );
}
