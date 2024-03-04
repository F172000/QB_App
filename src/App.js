import React from "react";
import Login from "./component/login";
import Signup from "./component/signup";
import Home from "./component/home";
import PaymentForm from "./component/paymentscreen2";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profile from "./component/profile";
import Uploadquebank from "./component/uploadquestionbank";
import Payments1 from "./component/paymentscreen1";
import Creditcard from "./component/paymentscreen2";
import "./component/style.css";
import QuizPage from "./component/Quiz";
import Questionbank from "./component/myquestionbank";
import Testknowledge from "./component/testmyknowledge";
import Result from "./component/result";
import Aibank from "./component/aiquestionbank";
import Uploads1 from "./component/uploads1";
import Uploads2 from "./component/uploads2";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/PaymentForm" element={<PaymentForm />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Uploadquebank" element={<Uploadquebank />} />
        <Route path="/Payments1" element={<Payments1 />} />
        <Route path="/Creditcard" element={<Creditcard />} />
        <Route path="/QuizPage" element={<QuizPage />} />
        <Route path="/Testknowledge" element={<Testknowledge />} />
        <Route path="/Questionbank" element={<Questionbank />} />
        <Route path="/Result" element={<Result />} />
        <Route path="/Aibank" element={<Aibank />} />
        <Route path="/Uploads2" element={<Uploads2 />} />
        <Route path="/Uploads1" element={<Uploads1 />} />
      </Routes>
    </Router>
  );
}
export default App;
