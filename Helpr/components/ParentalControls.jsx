import React, { useState } from "react";
import { StatusBar, ScrollView, StyleSheet, Text, View, Switch, TouchableOpacity } from "react-native";

export default function ParentalControls() {
  const [isSOSActive, setIsSOSActive] = useState(true);
  const [isLocationTrackingEnabled, setIsLocationTrackingEnabled] = useState(true);
  const [isMediaSharingEnabled, setIsMediaSharingEnabled] = useState(true);
  const [isScreenTimeLimitEnabled, setIsScreenTimeLimitEnabled] = useState(false);

  const handleToggleSOS = () => setIsSOSActive((prevState) => !prevState);
  const handleToggleLocationTracking = () => setIsLocationTrackingEnabled((prevState) => !prevState);
  const handleToggleMediaSharing = () => setIsMediaSharingEnabled((prevState) => !prevState);
  const handleToggleScreenTimeLimit = () => setIsScreenTimeLimitEnabled((prevState) => !prevState);

  const handleSaveChanges = () => alert("Settings saved");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Parental Controls</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.sectionTitle}>SOS Feature</Text>
        <Text style={styles.description}>Allow your child to activate the SOS feature for emergencies.</Text>
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Enable SOS Alert</Text>
          <Switch value={isSOSActive} onValueChange={handleToggleSOS} />
        </View>

        <Text style={styles.sectionTitle}>Location Tracking</Text>
        <Text style={styles.description}>Control location tracking permissions for safety features.</Text>
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Enable Location Tracking</Text>
          <Switch value={isLocationTrackingEnabled} onValueChange={handleToggleLocationTracking} />
        </View>

        <Text style={styles.sectionTitle}>Multimedia Sharing</Text>
        <Text style={styles.description}>Control if your child can capture and share multimedia (photos, videos, etc.) during emergencies.</Text>
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Enable Multimedia Sharing</Text>
          <Switch value={isMediaSharingEnabled} onValueChange={handleToggleMediaSharing} />
        </View>

        <Text style={styles.sectionTitle}>Screen Time Limit</Text>
        <Text style={styles.description}>Enable a daily screen time limit for the app usage.</Text>
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Enable Screen Time Limit</Text>
          <Switch value={isScreenTimeLimitEnabled} onValueChange={handleToggleScreenTimeLimit} />
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 25,
    paddingTop: StatusBar.currentHeight || 20,
    flexDirection: 'column',
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    marginTop: 20,
  },
  description: {
    fontSize: 14,
    color: "#eee",
    lineHeight: 22,
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  switchLabel: {
    fontSize: 16,
    color: "#fff",
    marginRight: 10,
  },
  buttonContainer: {
    marginTop: 'auto',
    paddingBottom: 20,
    alignItems: 'center', // Center the button horizontally
  },
  button: {
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 1,
    paddingVertical: 20,
    alignItems: 'center',
    width: '100%', // Adjust width as needed
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
