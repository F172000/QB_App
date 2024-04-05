
import {
    getDocs,
    collection,where,query
  } from "firebase/firestore";
  import { db} from "../config/firebase";
  import { createAsyncThunk } from "@reduxjs/toolkit";
export const getQuestionBanks  = createAsyncThunk(
    "questionBank/getquestionBanks",
    async (_, { rejectWithValue, dispatch }) => {
      try {
        const querySnapshot = await getDocs((collection(db, "questionBanks")));
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
  export const getQuestionBanksBySearchTerm  = createAsyncThunk(
    "questionBank/getquestionBanks",
    async (searchTerm, { rejectWithValue, dispatch }) => {
      try {
        const querySnapshot = await getDocs(query(collection(db, "questionBanks"), where("name", "==", searchTerm)));
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
  export const  getQuestionBanksById  = createAsyncThunk(
    "questionBank/getquestionBanksById",
    async (id, { rejectWithValue, dispatch }) => {
      try {
        const querySnapshot = await getDocs(query(collection(db, "questionBanks"),where("userID","==",id)));
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
  export const   getUserQuestionBanksBySearchTerm  = createAsyncThunk(
    "questionBank/getquestionBanksById",
    async ({id,searchTerm}, { rejectWithValue, dispatch }) => {
      try {
        console.log(id,searchTerm,"id and searchterm>>>>>>");
        const querySnapshot = await getDocs(query(collection(db, "questionBanks"),where("userID","==",id), where("name", "==", searchTerm)));
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