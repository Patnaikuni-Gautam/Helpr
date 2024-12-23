import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Helpr() {
  const navigation = useNavigation();

  const handleDecline = () => {
    Alert.alert("Request Declined", "You have declined the SOS request.");
    navigation.navigate("Home"); // Navigate back to the Home Screen or anywhere suitable
  };

  const handleAccept = () => {
    Alert.alert("Request Accepted", "You have accepted the SOS request.");
    navigation.navigate("HelpAccepted"); // Navigate to the screen where help is accepted
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SOS Alert Received</Text>
      <Text style={styles.description}>You have a new SOS alert. Would you like to help?</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.declineButton} onPress={handleDecline}>
          <Text style={styles.buttonText}>Decline</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  declineButton: {
    backgroundColor: "#ff4d4d",
    padding: 15,
    borderRadius: 8,
    width: "45%",
    alignItems: "center",
  },
  acceptButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    width: "45%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
