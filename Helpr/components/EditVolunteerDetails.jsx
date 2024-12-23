import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity, StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function EditVolunteerDetails() {
  const navigation = useNavigation();
  
  // State to hold editable fields with default values
  const [userName, setUserName] = useState("savior"); // Default is empty string

  // Fetch data from AsyncStorage
  useEffect(() => {
    const fetchDetails = async () => {
      const storedUserName = await AsyncStorage.getItem("volunteerName");

      // Set default values if no data is found
      setUserName(storedUserName || ""); // Default to empty string if no username
    };

    fetchDetails();
  }, []);

  const handleSave = async () => {
    // Save the edited details to AsyncStorage
    await AsyncStorage.setItem("volunteerName", userName);

    // Navigate back to the profile screen
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Volunteer Profile</Text>

      {/* Editable fields */}
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        value={userName}
        onChangeText={setUserName} // Update state when text changes
      />

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'stretch',
    backgroundColor: "#000",
    padding: 25,
    paddingBottom: 10,
    paddingTop: StatusBar.currentHeight || 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 40,
  },
  label: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    color: "#fff",
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 1,
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});
