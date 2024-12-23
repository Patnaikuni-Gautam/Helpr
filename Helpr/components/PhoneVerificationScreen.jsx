import React, { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { auth, sendOtp } from "../Backend/FirebaseInitialization"; // Firebase initialization
import { getAuth, signInWithPhoneNumber } from "firebase/auth"; // Firebase Auth methods

const PhoneVerificationScreen = ({ route, navigation }) => {
  const { phoneNumber } = route.params; // Phone number passed from another screen
  const recaptchaVerifier = useRef(null); // Reference for the ReCAPTCHA verifier
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isNewUser, setIsNewUser] = useState(false); // Track if it's a new user or existing

  const sendVerificationCode = async () => {
    setIsLoading(true);
    setError("");

    try {
      // Check if the phone number is already registered (if it's an existing user)
      const authInstance = getAuth();
      const userExists = await checkIfPhoneNumberExists(authInstance, phoneNumber);

      if (userExists) {
        setIsNewUser(false); // Existing user
        const result = await sendOtp(auth, phoneNumber, recaptchaVerifier.current); // Send OTP
        setConfirmationResult(result);
        alert("OTP sent to " + phoneNumber);
      } else {
        setIsNewUser(true); // New user
        alert("Phone number not found. Please register.");
        // Optionally navigate to registration screen for new users
        navigation.navigate("NewUser"); // Assuming you have a NewUser screen
      }
    } catch (err) {
      setError("Error sending OTP: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to check if the phone number exists in Firebase Authentication
  const checkIfPhoneNumberExists = async (authInstance, phoneNumber) => {
    try {
      // Attempt to get user by phone number using Firebase method
      const userRecord = await authInstance.getUserByPhoneNumber(phoneNumber);
      return userRecord ? true : false; // Return true if user exists
    } catch (err) {
      console.log("User not found:", err);
      return false; // User not found, it is a new user
    }
  };

  const verifyOtp = async () => {
    if (!otp) {
      alert("Please enter the OTP.");
      return;
    }

    if (confirmationResult) {
      try {
        setIsLoading(true);
        await confirmationResult.confirm(otp); // Verify OTP
        if (isNewUser) {
          alert("Phone verified successfully. Welcome new user!");
          navigation.navigate("NewUser"); // Navigate to registration screen for new users
        } else {
          alert("Phone verified successfully. Welcome back!");
          navigation.navigate("Home"); // Navigate to home screen for existing users
        }
      } catch (err) {
        alert("Invalid OTP. Please try again.");
      } finally {
        setIsLoading(false);
      }
    } else {
      alert("Please wait for the OTP to be sent first.");
    }
  };

  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={auth.app.options} // Firebase config
      />
      <Text style={styles.header}>Phone Verification</Text>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity
        style={styles.button}
        onPress={sendVerificationCode}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>{isLoading ? "Sending OTP..." : "Send OTP"}</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        placeholderTextColor="#888"
        value={otp}
        onChangeText={setOtp}
        keyboardType="numeric"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={verifyOtp}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>{isLoading ? "Verifying..." : "Verify OTP"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#000",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    color: "#fff",
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#000",
    borderColor: "#fff",
    borderWidth: 1,
    padding: 15,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 10,
  },
});

export default PhoneVerificationScreen;
