import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase.js";
import { FirebaseError } from "firebase/app";

type SignUp = () => Promise<void>;

export const signup = async (email:string, password:string) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    return { success: true, user: res.user };
  } catch (error:unknown) {

    if ( error instanceof FirebaseError  &&  error.code === "auth/email-already-in-use") {
      return { success: false, message: "Email already exists" };
    }
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

import { signInWithEmailAndPassword } from "firebase/auth";

const login = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      "test@gmail.com",
      "123456",
    );
    console.log("Logged in:", userCredential.user);
  } catch (error) {
    console.error(error.message);
  }
};
