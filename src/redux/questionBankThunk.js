
import {
    getDocs,
    collection,
  } from "firebase/firestore";
  import { db} from "../config/firebase";
  import { createAsyncThunk } from "@reduxjs/toolkit";
export const getQuestionBanks  = createAsyncThunk(
    "questionBank/getquestionBanks",
    async (_, { rejectWithValue, dispatch }) => {
      try {
        const querySnapshot = await getDocs((collection(db, "questionBanks"))
        );
        if (querySnapshot.empty) {
            return rejectWithValue("No subscriptions found");
          }
    
          const Banks = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          if (Banks) {
            return Banks;
          }
      } catch (error) {
        console.log(error);
        return rejectWithValue(error.message || "Error fetching question banks");
      }
    }
  );