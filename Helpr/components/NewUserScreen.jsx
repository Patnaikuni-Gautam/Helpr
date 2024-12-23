import React, { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore"; 
import { auth, sendOtp } from "../Backend/FirebaseInitialization"; // Updated import

import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha"; // Import recaptcha

export default function NewUserScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState(""); 
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const recaptchaVerifier = useRef(null); // Reference for reCAPTCHA verification
  const db = getFirestore();

  // Function to handle phone number verification and OTP sending
  const handleProceed = async () => {
    const phoneRegex = /^[+][0-9]{10,15}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!phoneRegex.test(phone)) {
      Alert.alert("Invalid Phone Number", "Please enter a valid phone number, including country code.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Password Mismatch", "Passwords do not match!");
      return;
    }

    if (!passwordRegex.test(password)) {
      Alert.alert(
        "Weak Password",
        "Password must be at least 8 characters long and include:\n" +
          "- At least one uppercase letter\n" +
          "- At least one lowercase letter\n" +
          "- At least one number\n" +
          "- At least one special character (@, $, !, %, *, ?, &)."
      );
      return;
    }

    // Send OTP
    try {
      setIsLoading(true);
      const result = await sendOtp(auth, phone, recaptchaVerifier.current); // Send OTP using sendOtp function
      setConfirmationResult(result); // Save confirmation result
      Alert.alert("OTP sent!", "Please check your phone for the OTP.");
    } catch (error) {
      Alert.alert("Error", "Failed to send OTP: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to verify OTP, create user, and store user details in Firestore
  const verifyOtpAndCreateUser = async () => {
    if (!otp) {
      Alert.alert("OTP Error", "Please enter the OTP.");
      return;
    }

    try {
      // Verify OTP using the confirmation result
      await confirmationResult.confirm(otp);
      Alert.alert("OTP Verified", "Phone number verified successfully.");

      // Now create the user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      Alert.alert("Registration Successful", "User has been created.");

      // Store additional user details in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        phone: phone,
        createdAt: new Date(),
      });

      // Navigate to the VolunteerConsent page after successful registration
      navigation.navigate("VolunteerConsent");
    } catch (error) {
      Alert.alert("Error", "Error during verification or user creation: " + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={auth.app.options} // Firebase config
      />
      <Text style={styles.header}>Hello there!</Text>
      <Text style={styles.subHeader}>Welcome aboard!</Text>

      <View style={styles.subcontainer}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          placeholderTextColor="#888"
          value={phone}
          onChangeText={setPhone}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email address"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.label}>Create Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Create a new password"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm your Password"
          placeholderTextColor="#888"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      {confirmationResult ? (
        <View style={styles.subcontainer}>
          <Text style={styles.label}>Enter OTP</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter the OTP sent to your phone"
            placeholderTextColor="#888"
            value={otp}
            onChangeText={setOtp}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.proceedButton} onPress={verifyOtpAndCreateUser}>
            <Text style={styles.buttonText}>{isLoading ? "Verifying..." : "Verify OTP & Create User"}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.proceedButton} onPress={handleProceed} disabled={isLoading}>
            <Text style={styles.buttonText}>{isLoading ? "Sending OTP..." : "Proceed"}</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        style={styles.existingUserButton}
        onPress={() => navigation.navigate("ExistingUser")}
      >
        <Text style={styles.existingUserText}>I'm an existing user!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 50,
    paddingVertical: 25,
    justifyContent: "center",
    gap: 20,
  },
  label: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 16,
  },
  header: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subHeader: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  subcontainer: {
    gap: 10,
  },
  input: {
    color: "#fff",
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    gap: 20,
  },
  proceedButton: {
    backgroundColor: "#000",
    borderWidth: 1,
    borderColor: "#fff",
    padding: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  existingUserButton: {
    backgroundColor: "#fff",
    padding: 20,
    borderWidth: 1,
    borderColor: "#fff",
    alignItems: "center",
  },
  existingUserText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});
