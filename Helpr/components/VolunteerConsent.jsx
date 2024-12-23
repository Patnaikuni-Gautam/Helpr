import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { CheckBox } from "react-native-elements";
import { useDispatch } from "react-redux"; // Import the useDispatch hook
import { setUserToken } from "../Backend/authSlice"; // Import your action from the authSlice
import { auth } from "../Backend/FirebaseInitialization"; // Make sure this is correctly imported

export default function VolunteerConsent({ navigation }) {
  const [isVolunteer, setIsVolunteer] = useState(false);
  const dispatch = useDispatch(); // Initialize dispatch

  const handleProceed = () => {
    if (isVolunteer) {
      Alert.alert(
        "Thank you!",
        "We appreciate your willingness to volunteer and help others!"
      );
    } else {          
      Alert.alert("Notice", "You can always opt to volunteer later.");
    }

    // Set the user token after proceeding
    if (auth.currentUser) {
      dispatch(setUserToken(auth.currentUser.uid)); // Correct dispatch usage
      navigation.navigate("Home");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Volunteer Consent</Text>
      <Text style={styles.subHeader}>
        Would you like to be a volunteer and help others in times of need?
      </Text>

      <CheckBox
        title="Yes, I want to volunteer."
        checked={isVolunteer}
        onPress={() => setIsVolunteer(!isVolunteer)}
        containerStyle={styles.checkboxContainer}
        textStyle={styles.label}
        checkedColor="#fff"
        uncheckedColor="#888"
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
          <Text style={styles.buttonText}>Proceed</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
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
  checkboxContainer: {
    backgroundColor: "transparent",
    borderWidth: 0,
    margin: 0,
    padding: 0,
  },
  label: {
    color: "#fff",
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 20,
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
  backButton: {
    backgroundColor: "#fff",
    padding: 20,
    borderWidth: 1,
    borderColor: "#fff",
    alignItems: "center",
  },
  backButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});
