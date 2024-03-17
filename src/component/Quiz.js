
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

import Mainnavbar from "./navbarmain";
import { useNavigate } from "react-router-dom";
import { serverTimestamp } from "firebase/firestore";
import { collection, addDoc } from "@firebase/firestore";
import { db } from "../config/firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  resetQuizQuestions,
  resetQuestionsAnswers,
} from "../redux/quizQuestionSlice";
import { Spinner } from "react-bootstrap";

export default function QuizPage() {
  const dispatch = useDispatch();
  const [loader,setLoader]=useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { quizQuestions, answers } = useSelector(
    (state) => state.quizQuestions
  );
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [givenAnswers, setGivenAnswers] = useState([]);

  useEffect(() => {
    setTimeRemaining(60);
  }, [currentQuestion]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion]);

  const handleOptionChange = (option) => {
    setSelectedAnswer(option);
  };
  const handleNextQuestion = async () => {
    if (!selectedAnswer) {
      return;
    }
    givenAnswers.push(selectedAnswer);
    let updatedCorrectAnswers = 0;
    quizQuestions.forEach((question, index) => {
      if (givenAnswers[index] === question.correctAnswer) {
        updatedCorrectAnswers += 1;
      }
    });
    // Move to the next question
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    } else {
      setLoader(true);
      const QuizCollection = collection(db, "Quizes");
      const result = await addDoc(QuizCollection, {
        correctAnswers: updatedCorrectAnswers,
        totalQuestions: quizQuestions.length,
        userId: user?.id,
        createdAt: serverTimestamp(),
      });
      if (result) {
        setLoader(false);
        console.log(givenAnswers, "given");
        navigate("/Result", {
          state: {
            correctAnswers: updatedCorrectAnswers,
            totalQuestions: quizQuestions.length,
            Answers: givenAnswers,
          },
        });
      }
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prevQuestion) => prevQuestion - 1);
    }
  };

  const handleNext = async () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    } else {
      dispatch(resetQuizQuestions());
      dispatch(resetQuestionsAnswers());
      navigate("/test-knowledge");
    }
  };
  return (
    <div>
      {answers?.length === quizQuestions?.length ? (
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
              <Stepper
                activeStep={currentQuestion}
                alternativeLabel
                className="m-4"
              >
                {quizQuestions.map((question, index) => (
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
                  fontSize: isSmallScreen ? "1.7rem" : "2.8rem",
                }}
              >
                {quizQuestions[currentQuestion]?.questionText}
              </Typography>
              <FormControl className="m-4" component="fieldset">
                <RadioGroup
                  aria-label="options"
                  name="options"
                  value={answers[currentQuestion]}
                  // onChange={(e) => handleOptionChange(e.target.value)}
                >
                  {quizQuestions[currentQuestion]?.options.map(
                    (option, index) => (
                      <FormControlLabel
                        key={index}
                        value={option}
                        control={<Radio />}
                        label={option}
                      />
                    )
                  )}
                  {answers[currentQuestion] ===
                  quizQuestions[currentQuestion]?.correctAnswer ? (
                  <span className="correctLabel">Correct Answer</span>
                  ) : (
                    <span className="wrongLabel">Wrong Answer</span>
                  )}
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
                >
                  Previous
                </Button>
                {/* <div style={{ position: "relative", textAlign: "center" }}>
                <CircularProgress
                  variant="determinate"
                  value={(timeRemaining / 60) * 100}
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
              </div> */}
                <Button
                  variant="contained"
                  onClick={handleNext}
                  // disabled={!selectedAnswer }
                >
                  Next
                </Button>
              </Box>
            </CardContent>
          </div>
        </Container>
      ) : (
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
              <Stepper
                activeStep={currentQuestion}
                alternativeLabel
                className="m-4"
              >
                {quizQuestions.map((question, index) => (
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
                  fontSize: isSmallScreen ? "1.7rem" : "2.8rem",
                }}
              >
                {quizQuestions[currentQuestion]?.questionText}
              </Typography>
              <FormControl className="m-4" component="fieldset">
                <RadioGroup
                  aria-label="options"
                  name="options"
                  value={selectedAnswer}
                  onChange={(e) => handleOptionChange(e.target.value)}
                >
                  {quizQuestions[currentQuestion]?.options.map(
                    (option, index) => (
                      <FormControlLabel
                        key={index}
                        value={option}
                        control={<Radio />}
                        label={option}
                      />
                    )
                  )}
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
                >
                  Previous
                </Button>
                <div style={{ position: "relative", textAlign: "center" }}>
                  <CircularProgress
                    variant="determinate"
                    value={(timeRemaining / 60) * 100}
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
                  <Typography variant="body1">{timeRemaining} s</Typography>
                </div>
                <Button
                  variant="contained"
                  onClick={handleNextQuestion}
                  disabled={!selectedAnswer || timeRemaining === 0 || loader}
                >
                  {loader? <Spinner size="md"/> :"Next"}
                </Button>
              </Box>
            </CardContent>
          </div>
        </Container>
      )}
    </div>
  );
}
