import {
    getDocs,orderBy,
    collection,where,query,onSnapshot
  } from "firebase/firestore";
  import { db} from "../config/firebase";
  import dayjs from "dayjs";
  import { createAsyncThunk } from "@reduxjs/toolkit";
  import {setQuizes} from './quizesSlice';
  
export const getQuizes = createAsyncThunk(
  "quizes/getquizes",
  async (Id, { rejectWithValue, dispatch }) => {
    try {
      console.log(Id);

      // Create a query to get documents where "userId" is equal to Id
      const q = query(collection(db, "Quizes"), where("userId", "==", Id),orderBy("createdAt", "desc"));

      // Listen for real-time changes using onSnapshot
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const quizes = [];
        querySnapshot.forEach((doc) => {
          const firestoreTimestamp = doc.data().createdAt;
          const date = new Date(
            firestoreTimestamp?.seconds * 1000 +
              firestoreTimestamp?.nanoseconds / 1e6
          );
          const datecreated = dayjs(date).format("DD/MM/YYYY");
          quizes.push({ ...doc.data(), id: doc.id, createdAt: datecreated });
        });

        // Dispatch the quizes array to the store
        dispatch(setQuizes(quizes));
      });
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message || "Error fetching quizes");
    }
  }
);

