import {
  getDocs,
  collection,
  doc,
  deleteDoc,
  addDoc,
  updateDoc,
  getDoc,
  query,
  where,
  onSnapshot,serverTimestamp
} from "firebase/firestore";
import { db, auth } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { PASSWORD_LOADER } from "./authSlice";
export const RegisterUser =
  (Name, Email,Phone, Password, setloading) => async (dispatch) => {
    try{
      setloading(true);
      if (!Name || !Email || !Password || !Phone) {
        toast.error("name email Phone and password are not given");
        return;
      }
      const user = await createUserWithEmailAndPassword(auth, Email, Password)
        .then((userCredential) => {
          return userCredential.user;
        })
        .catch((error) => {
          setloading(false);
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
          toast.error(errorMessage);
          // ..
        });
      if (user) {
        let result = await addDoc(collection(db, "users"), {
          name: Name,
          email: Email,
          phone: Phone,
          uid: user.uid,
          createdAt: serverTimestamp(),
          payment_status:"pending",
          image:''
        });
        if (result.id) {
          toast.success("Successfully Registered...");
          setloading(false);
     setTimeout(() => {
      window.location.href = "/login";
     },3000); 
        }
      }
      // window.location.href = "/auth/login";
      console.log(user, "user");
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

export const SignInUser = createAsyncThunk(
  "auth/signin",
  async (user, { rejectWithValue, dispatch }) => {
    try {
      console.log(user);
      const querySnapshot = await getDocs(
        query(collection(db, "users"), where("uid", "==", user.uid))
      );
      const id = querySnapshot.docs[0].id;
      const data = querySnapshot.docs[0].data();
      console.log({ id, data });
      return { id, ...data };
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message || "Error signing in");
    }
  }
);
export const SignOutUser = () => async (dispatch) => {
  try {
    const result = localStorage.clear();
    console.log(result);
    window.location.href = "/login";
  } catch (error) {
    console.log(error.message);
  }
};
export const ResetPassword = (email) => async (dispatch) => {
  try {
    dispatch(ForgetPasswordLoader(true));
    const querySnapshot = await getDocs(
      query(
        collection(db, "users"),
        where("email", "==", email)
      )
    );
    if(!querySnapshot.docs[0]?.id){
      toast.error("User doesn't Exist...");

      dispatch(ForgetPasswordLoader(false));
    }
    if(querySnapshot.docs[0]?.id){
    await sendPasswordResetEmail(auth, email)
      .then((res) => {
        toast.success("Successfully Send Reset Password Link...");
        dispatch(ForgetPasswordLoader(false));
        setTimeout(()=>window.location.href='/auth/login', 5000);
      })
      .catch((err) => {
        toast.error("Cannot Send Reset Password Link...");
        dispatch(ForgetPasswordLoader(false));
      });
    }
  } catch (error) {
    console.log(error.message);
    toast.error(error.message);
    dispatch(ForgetPasswordLoader(false));
  }
};
export const ForgetPasswordLoader = (val) => async (dispatch) => {
  await dispatch(PASSWORD_LOADER(val));
};
