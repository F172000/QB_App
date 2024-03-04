import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
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
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Navbar from "./navbar";
import footor from "./images/footor.png";
import Mainnavbar from "./navbarmain";

const questions = [
  {
    id: 1,
    question: "1. What is the capital of France?",
    options: ["  A) Berlin", "B) Madrid", "C) Paris", "D) Rome"],
    correctAnswer: "Paris",
  },
  {
    id: 2,
    question: "2. Which planet is known as the Red Planet?",
    options: ["Mars", "Jupiter", "Venus", "Saturn"],
    correctAnswer: "Mars",
  },
  {
    id: 3,
    question: "3. What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correctAnswer: "Rome",
  },
  {
    id: 4,
    question: "4. Which planet is known as the Blue Planet?",
    options: ["Mars", "Jupiter", "Venus", "Saturn"],
    correctAnswer: "Jupiter",
  },
  // Add more questions as needed
];

export default function QuizPage() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(60);

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

  const handleOptionChange = (event) => {
    setSelectedAnswer(event.target.value);
  };

  const handleNextQuestion = () => {
    // Check answer and move to the next question
    // Add your logic to handle correct/incorrect answers as needed
    console.log("Selected answer:", selectedAnswer);

    // Move to the next question
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
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
        <Mainnavbar></Mainnavbar>
        <div className="m-4">
          <CardContent
            style={{
              paddingLeft: isSmallScreen ? "0rem" : "1rem",
              paddingRight: isSmallScreen ? "0rem" : "1rem",
              margin: isSmallScreen ? "0rem" : "1.5rem",
            }}
          >
            <Stepper
              activeStep={currentQuestion}
              alternativeLabel
              className="m-4"
            >
              {questions.map((question, index) => (
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
                    {/* {index + 1} */}
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
              // variant="h4"
              // paragraph
            >
              {questions[currentQuestion].question}
            </Typography>
            <FormControl className="m-4" component="fieldset">
              <RadioGroup
                aria-label="options"
                name="options"
                value={selectedAnswer}
                onChange={handleOptionChange}
              >
                {questions[currentQuestion].options.map((option, index) => (
                  <FormControlLabel
                    key={index}
                    value={option}
                    control={
                      <Radio
                        sx={{
                          color:
                            selectedAnswer === option ? "#FCC822" : "#000000",
                          "&.Mui-checked": {
                            color: "#FCC822",
                          },
                        }}
                      />
                    }
                    label={option}
                  />
                ))}
              </RadioGroup>
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
                style={{
                  color: "#333333",
                  background:
                    "linear-gradient(95.34deg, #D1D1D1 0%, #D1D1D1 100%)",
                  marginRight: isSmallScreen ? " 2.5rem" : "0rem",
                  boxShadow:
                    "0px 5.805691242218018px 23.22276496887207px -6.966829299926758px #D1D1D1",
                  fontSize: isSmallScreen ? "12px" : "15px",
                }}
              >
                Previous
              </Button>
              <div style={{ position: "relative", textAlign: "center" }}>
                <CircularProgress
                  variant="determinate"
                  value={(timeRemaining / 60) * 100} // assuming 60 seconds countdown
                  //color="primary"
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
                <Typography
                  variant="body1"
                  style={{
                    position: "relative",
                    zIndex: 1,
                    fontSize: isSmallScreen ? "11px" : "15px",
                  }}
                >
                  {timeRemaining} s
                </Typography>
              </div>
              <Button
                variant="contained"
                // color="primary"
                onClick={handleNextQuestion}
                disabled={timeRemaining === 0}
                style={{
                  color: "#333333",
                  background:
                    "linear-gradient(95.34deg, #FCC822 0%, #FFCD2E 100%)",
                  boxShadow:
                    "0px 5.805691242218018px 23.22276496887207px -6.966829299926758px #FBE18F",
                  marginLeft: isSmallScreen ? " 2.5rem" : "0rem",
                  fontSize: isSmallScreen ? "12px" : "15px",
                }}
              >
                Next
              </Button>
            </Box>
          </CardContent>
        </div>
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
