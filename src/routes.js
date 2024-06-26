
import Login from "./component/login";
import Signup from "./component/signup";
import Home from "./component/home";
import PaymentForm from "./component/PaymentDetails";
import "bootstrap/dist/css/bootstrap.min.css";
import Profile from "./component/profile";
import Uploadquebank from "./component/uploadquestionbank";
import Payment from "./component/Payment";
import "../src/assets/css/style.css";
import QuizPage from "./component/Quiz";
import Questionbank from "./component/myquestionbank";
import Testknowledge from "./component/testmyknowledge";
import Result from "./component/result";
import Aibank from "./component/aiquestionbank";
import PaymentDetails from "./component/PaymentDetails";
import QuestionBankList from "./component/QuestionBankList";

var routes = [
  {
    path: "/",
    component: Home,
    layout: "auth",
  },
  {
    path: "/payment",
    component: PaymentForm,
    layout: "admin",
  },
  {
    path: "/test-knowledge",
    component:Testknowledge ,
    layout: "admin",
  },
  // {
  //   path: "/forget_password",
  //   name: "Forget Password",
  //   icon: "ni ni-key-25 text-info",
  //   component: ForgetPassword,
  //   layout: "/auth",
  //   isMenu: false,
  // },
  {
    path: "/login",
    component: Login,
    layout: "auth",
  },
  {
    path: "/signup",
    component: Signup,
    layout: "auth",
  },
  {
    path: "/profile",
    component:Profile,
    layout: "admin",
  },
  {
    path: "/uploadquebank",
    component: Uploadquebank,
    layout: "admin",
  },
  {
    path: "/Payment",
    component: Payment,
    layout: "admin",
  },
  {
    path: "/Payment-Details",
    component: PaymentDetails,
    layout: "admin",
  },

  {
    path: "/Quiz",
    component: QuizPage,
    layout: "admin",
  },

  {
    path: "/Questionbank",
    component: Questionbank,
    layout: "admin",
  },
  {
    path: "/test-knowledge",
    component: Testknowledge,
    layout: "admin",
  },
  {
    path: "/Result",
    component: Result,
    layout: "admin",
  },
  {
    path: "/Ai-bank",
    component: Aibank,
    layout: "admin",
  },
  {
    path: "/list_of_question_banks",
    component: QuestionBankList,
    layout: "admin",
  },
];
export default routes;
