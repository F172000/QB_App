import {
    getDocs,
    collection,where,query
  } from "firebase/firestore";
  import { db} from "../config/firebase";
  import dayjs from "dayjs";
  import { createAsyncThunk } from "@reduxjs/toolkit";
export const getQuizes  = createAsyncThunk(
    "quizes/getquizes", async (Id , { rejectWithValue, dispatch }) => {
      try {
        console.log(Id);
        const querySnapshot = await getDocs(
            query(collection(db, "Quizes"), where("userId", "==", Id))
        );
        if (querySnapshot.empty) {
            return rejectWithValue("No Matching Quizes found");
          }
          console.log(querySnapshot,"querysnapshot");
    
          const quizes = querySnapshot.docs.map((doc) => {
            console.log(doc.data());
            const firestoreTimestamp = doc.data()?.createdAt;
            console.log(firestoreTimestamp,'fire');
            const date = new Date(
              firestoreTimestamp.seconds * 1000 +
                firestoreTimestamp.nanoseconds / 1e6
            );
            const datecreated = dayjs(date).format("DD/MM/YYYY");
            console.log(datecreated);
         return {...doc.data(),id: doc.id, createdAt:datecreated}
        });
           if(quizes.length>0){
            return quizes;
           }
      } catch (error) {
        console.log(error);
        return rejectWithValue(error.message || "Error fetching quizes");
      }
    }
  );