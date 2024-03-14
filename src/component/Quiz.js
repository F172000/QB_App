
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  CardContent,
  Container,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";

import Footer from "./footer";
import Mainnavbar from "./navbarmain";
import { useLocation, useNavigate } from "react-router-dom";
import { serverTimestamp } from "firebase/firestore";
import { getFirestore, collection, addDoc } from "@firebase/firestore";
import { db } from "../config/firebase";
import { getAuth } from "firebase/auth";
import { useSelector } from "react-redux";

export default function QuizPage() {
  const navigate=useNavigate();
  const location = useLocation();
  const {user}=useSelector((state)=>state.auth);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [Questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  useEffect(() => {
    const { questions } = location.state;
    setQuestions(questions);
  }, [location.state]);

  useEffect(() => {
    // Reset timer when the question changes
    setTimeRemaining(60);
  }, [currentQuestion]);

  useEffect(() => {
    // Countdown timer
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    // Cleanup timer on component unmount or when the next question is selected
    return () => clearInterval(timer);
  }, [currentQuestion]);

  const handleOptionChange = (option) => {
    setSelectedAnswer(option);
  };

  const handleNextQuestion = async() => {
    console.log(selectedAnswer,"selectedAnswer")
    if (!selectedAnswer) {
      // You can add an alert or notification to prompt the user to select an answer
      return;
    }
    let updatedCorrectAnswers = correctAnswers;
    if (selectedAnswer === Questions[currentQuestion]?.correctAnswer) {
      updatedCorrectAnswers += 1;
    }
    console.log(updatedCorrectAnswers,"correct");
    // Move to the next question
    if (currentQuestion < Questions.length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    }else {
      const QuizCollection = collection(db, 'Quizes');
     const result= await addDoc(QuizCollection, {
        correctAnswers: updatedCorrectAnswers,
        totalQuestions: Questions.length,
        userId:user?.id,
        createdAt:serverTimestamp()
      });
      // Redirect to the next page when the last question is answered
      if(result){
      navigate("/Result",{ state: { correctAnswers: updatedCorrectAnswers,
        totalQuestions: Questions.length, } });
      }
    }

  };

  const handlePreviousQuestion = () => {
    // Move to the previous question
    if (currentQuestion > 0) {
      setCurrentQuestion((prevQuestion) => prevQuestion - 1);
    }
  };

  return (
    <div>
      <Container style={{ padding: "0px" }}>
        <Mainnavbar />
        <div className="m-4">
          <CardContent
            style={{
              paddingLeft: isSmallScreen ? "0rem" : "1rem",
              paddingRight: isSmallScreen ? "0rem" : "1rem",
              margin: isSmallScreen ? "0rem" : "1.5rem",
              marginTop: isSmallScreen ? "130px" : "150px",
            }}
          >
            <Stepper activeStep={currentQuestion} alternativeLabel className="m-4">
              {Questions.map((question, index) => (
                <Step key={index}>
                  <StepLabel
                    color="#000000"
                    StepIconProps={{
                      style: {
                        color:
                          index === currentQuestion
                            ? "#FCC832" // Current question color
                            : currentQuestion > index
                            ? "#FCC832" // Completed (previous) question color when moving to next
                            : "#D1D1D1", // Remaining question color
                      },
                    }}
                  >
                    {index + 1}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
            <Typography
              className="question"
              style={{
                marginTop: "50px",
                fontSize: isSmallScreen ? "1.7rem" : "2.8rem", // Relative font size
              }}
            >
              {Questions[currentQuestion]?.questionText}
            </Typography>
            <FormControl className="m-4" component="fieldset"  >
            {Questions[currentQuestion]?.options.map((option, index) => (
              <RadioGroup
              key={index}
                aria-label="options"
                name="options"
                value={selectedAnswer}
                onChange={()=>handleOptionChange(option)}
              >
                  <FormControlLabel
                    value={option}
                    control={
                      <Radio
                        sx={{
                          color: selectedAnswer === option ? "#FCC822" : "#000000",
                          "&.Mui-checked": {
                            color: "#FCC822",
                          },
                        }}
                      />
                    }
                    label={option}
                  />
              </RadioGroup>
               ))}
            </FormControl>
            <Box
              mt={7}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handlePreviousQuestion}
                disabled={currentQuestion === 0}
              >
                Previous
              </Button>
              <div style={{ position: "relative", textAlign: "center" }}>
                <CircularProgress
                  variant="determinate"
                  value={(timeRemaining / 60) * 100} // assuming 60 seconds countdown
                  thickness={5}
                  size={60}
                  style={{
                    color: "#FCC822",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                />
                <Typography variant="body1">
                  {timeRemaining} s
                </Typography>
              </div>
              <Button
                variant="contained"
                onClick={handleNextQuestion}
                disabled={timeRemaining === 0}
              >
                Next
              </Button>
            </Box>
          </CardContent>
        </div>
      </Container>
      {/* <div className="mt-3">
      <Footer />
      </div> */}
    </div>
  );
}
