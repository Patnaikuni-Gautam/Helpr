import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { sendOtp } from "../Backend/FirebaseInitialization"; // Import the sendOtp function
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { auth } from "../Backend/FirebaseInitialization";

export default function ExistingUserScreen({ navigation }) {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [useOtpLogin, setUseOtpLogin] = useState(false); // Toggle between OTP and email/password login
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const recaptchaVerifier = React.useRef(null);

  // Function to handle email/password login
  const handleEmailLogin = async () => {
    if (!emailOrPhone || !password) {
      Alert.alert("Error", "Please enter both email/phone and password.");
      return;
    }

    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, emailOrPhone, password);
      Alert.alert("Login Successful", "Welcome back!");
      navigation.navigate("Home"); // Navigate to Home screen
    } catch (error) {
      Alert.alert("Login Failed", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to send OTP for phone login
  const handleSendOtp = async () => {
    if (!emailOrPhone) {
      Alert.alert("Error", "Please enter your phone number.");
      return;
    }

    try {
      setIsLoading(true);
      const result = await sendOtp(auth, emailOrPhone, recaptchaVerifier.current);
      setConfirmationResult(result);
      Alert.alert("OTP Sent", "Please check your phone for the OTP.");
    } catch (error) {
      Alert.alert("Error", "Failed to send OTP: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to verify OTP for phone login
  const handleVerifyOtp = async () => {
    if (!otp) {
      Alert.alert("Error", "Please enter the OTP.");
      return;
    }

    try {
      setIsLoading(true);
      await confirmationResult.confirm(otp);
      Alert.alert("Login Successful", "Welcome back!");
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Error", "Invalid OTP: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={auth.app.options}
      />
      <Text style={styles.header}>Welcome Back!</Text>
      <Text style={styles.subHeader}>Login to continue</Text>

      <TextInput
        style={styles.input}
        placeholder={useOtpLogin ? "Enter your phone number" : "Enter your email"}
        placeholderTextColor="#888"
        value={emailOrPhone}
        onChangeText={setEmailOrPhone}
        keyboardType={useOtpLogin ? "phone-pad" : "default"}
      />

      {!useOtpLogin && (
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      )}

      {useOtpLogin && confirmationResult && (
        <TextInput
          style={styles.input}
          placeholder="Enter OTP"
          placeholderTextColor="#888"
          value={otp}
          onChangeText={setOtp}
          keyboardType="numeric"
        />
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={
          useOtpLogin
            ? confirmationResult
              ? handleVerifyOtp
              : handleSendOtp
            : handleEmailLogin
        }
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading
            ? useOtpLogin
              ? confirmationResult
                ? "Verifying OTP..."
                : "Sending OTP..."
              : "Logging in..."
            : useOtpLogin
            ? confirmationResult
              ? "Verify OTP"
              : "Send OTP"
            : "Login"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.toggleButton}
        onPress={() => setUseOtpLogin(!useOtpLogin)}
      >
        <Text style={styles.toggleButtonText}>
          {useOtpLogin ? "Login with Email and Password" : "Login with OTP"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

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
  subHeader: {
    fontSize: 18,
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
  toggleButton: {
    marginTop: 20,
    alignItems: "center",
  },
  toggleButtonText: {
    color: "#1E90FF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
