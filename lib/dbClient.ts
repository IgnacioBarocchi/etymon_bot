import firebase from "firebase";
import { firebaseConfig } from "../api/firebase.config";
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export const findOne = async function (input: string): Promise<string> {
  let cityRef = db.collection("etymologies").doc(input.toUpperCase());
  let getDoc = cityRef.get().then((doc) => {
    if (!doc.exists) {
      console.log("No such document!");
      return "No hay información.";
    } else {
      return doc.data()?.etymology;
    }
  });
  console.log(getDoc);
  return getDoc;
};
/*
.catch((err) => {
  console.log("Error getting document", err);
});
*/
