import { getAuth, signInWithPhoneNumber } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCm6hx1yGUIV8A-Pm5IIVfK77rmO42XRe8",
  authDomain: "helpr-4f71a.firebaseapp.com",
  projectId: "helpr-4f71a",
  storageBucket: "helpr-4f71a.firebaseapp.com",
  messagingSenderId: "301982994557",
  appId: "1:301982994557:web:22e7f9670c8ab494f8e114",
  measurementId: "G-HN3GQB4LYQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

// Function to send OTP (Phone Verification)
export const sendOtp = async (auth, phoneNumber, recaptchaVerifier) => {
  try {
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
    return confirmationResult; // Return the confirmation result
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw new Error("Error sending OTP");
  }
};

// Export auth and firestore
export { auth, firestore };
