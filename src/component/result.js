import score from "../assets/images/score.png";
import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  useMediaQuery,
  createTheme,
  StepLabel,
  Button,CircularProgress
} from "@mui/material";
import Mainnavbar from "./navbarmain";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setAnswerState } from "../redux/quizQuestionSlice";
import Footer from "./footer";
import { getQuizes } from "../redux/quizesThunk";

const theme = createTheme();
export default function Result() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { quizes,loading } = useSelector((state) => state.quizes);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [correct, setCorrect] = useState(0);
  const [total, settotal] = useState(0);
  useEffect(() => {
    dispatch(getQuizes(user?.id));
  }, []);
  useEffect(() => {
    const { correctAnswers, totalQuestions, Answers } = location.state;
    dispatch(setAnswerState(Answers));
    setCorrect(correctAnswers);
    settotal(totalQuestions);
  }, [location.state]);
  return (
    <div>
      <div style={{ overflow: "hidden", marginTop: "100px" }}>
        <Mainnavbar />

        <div className="m-4 ">
          <Typography
            style={{
              fontWeight: 600,
              fontSize: isSmallScreen ? "2.4rem" : "2.8rem", // Relative font size
              color: "#333333",
              font: "Poppins",
              marginLeft: "50px",
              //lineHeight: "75px",
              marginTop: isSmallScreen ? "0px" : "20px", //

              // marginLeft: isSmallScreen ? 0 : 20,
              lineHeight: isSmallScreen ? 1.4 : 1.5,
            }}
          >
            Your Score
          </Typography>
        </div>

        <div className="row m-4 ">
          <div className="col-md-6">
            {/* Your Image */}

            <div style={{ position: "relative", textAlign: "center" }}>
              <img
                src={score}
                style={{
                  width: isSmallScreen ? "250px" : "350px",
                  height: isSmallScreen ? "200px" : "300px",
                }}
                alt="Score"
              />
              {/* Overlay Text */}
              <Typography
                variant="h1"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  fontFamily: "Poppins",
                  fontSize: isSmallScreen ? "45px" : "105px",
                  fontWeight: 600,
                  lineHeight: "158px",
                  letterSpacing: "0em",
                  textAlign: "center",
                  color: "#000000", // Set the color to match your design
                }}
              >
                {correct}/{total}
              </Typography>
            </div>
          </div>
          <div className="col-md-6 " style={{ position: "relative" }}>
            <Card
              className="p-4"
              style={{
                width: isSmallScreen ? "340px" : "450px",
                height: " 350px",
                marginTop: isSmallScreen ? "35px" : "0px",
                borderRadius: "20px",
                backgroundColor: "#D4ECFF",
                boxShadow: "0px 4px 4px 0px #D9ECFF80",
              }}
            >
              <Typography
                className="m-4"
                variant="h6"
                gutterBottom
                style={{
                  fontWeight: 600,
                  fontSize: "25px",
                }}
              >
                Previous Result
              </Typography>
{loading?  <div className="col-12 justify-content-center d-flex pt-2 pb-2">
            {" "}
            <CircularProgress color="inherit" />
          </div>: quizes?.length>0?
              <TableContainer style={{ border: "1px solid black" }}>
                <Table>
                  <TableBody>
                    {/* Header Row */}
                    <TableRow>
                      <TableCell style={{ fontWeight: 600 }}>Date</TableCell>
                      <TableCell style={{ fontWeight: 600 }} align="right">
                        Score
                      </TableCell>
                    </TableRow>

                    {/* Data Rows */}

                    {quizes?.slice(0, 3)?.map((row, index) => (
                      <TableRow key={index} style={{ borderBottom: "0px" }}>
                        <TableCell
                          component="th"
                          scope="row"
                          style={{ textAlign: "left", borderBottom: "0px" }}
                        >
                          {row.createdAt}
                        </TableCell>
                        <TableCell align="right">
                          {row.correctAnswers}/{row.totalQuestions}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              :
              <div className="col-12 justify-content-center d-flex pt-2 pb-2">
            {" "}
            <p>No Quizes Yet</p>
          </div>
          }
            </Card>
          </div>
        </div>
        <div className="d-flex justify-content-center m-4">
          <Button
            href="#"
            style={{
              backgroundColor: " #fcc822",
              color: "black",
              textAlign: "center",
              borderRadius: "13px",
              font: "Poppins",
              fontWeight: 600,
              fontSize: "18px",
              marginTop: "20px",
              //  padding: "25px",
              width: "180px",
              height: "60px",
            }}
            onClick={() => navigate("/Quiz")}
          >
            View Results
          </Button>
        </div>
      </div>
      <div>
        <Footer />{" "}
      </div>
    </div>
  );
}
