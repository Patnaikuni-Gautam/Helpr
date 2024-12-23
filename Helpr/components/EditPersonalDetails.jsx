import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, StatusBar } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function EditPersonalDetails() {
  const [userName, setUserName] = useState("");
  const [userAge, setUserAge] = useState(0);
  const [userGender, setUserGender] = useState("");
  const [userAddress, setUserAddress] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    // Load data from AsyncStorage when the screen is mounted
    const loadUserData = async () => {
      try {
        const storedUserName = await AsyncStorage.getItem('userName');
        const storedUserAge = await AsyncStorage.getItem('userAge');
        const storedUserGender = await AsyncStorage.getItem('userGender');
        const storedUserAddress = await AsyncStorage.getItem('userAddress');
        
        if (storedUserName) setUserName(storedUserName);
        if (storedUserAge) setUserAge(parseInt(storedUserAge));
        if (storedUserGender) setUserGender(storedUserGender);
        if (storedUserAddress) setUserAddress(storedUserAddress);
      } catch (error) {
        console.error('Error loading user data', error);
      }
    };

    loadUserData();
  }, []);

  const saveChanges = async () => {
    // Save the data to AsyncStorage
    try {
      await AsyncStorage.setItem('userName', userName);
      await AsyncStorage.setItem('userAge', userAge.toString());
      await AsyncStorage.setItem('userGender', userGender);
      await AsyncStorage.setItem('userAddress', userAddress);

      alert("Details saved successfully!");
      navigation.goBack(); // Navigate back to the previous screen
    } catch (error) {
      console.error('Error saving user data', error);
    }
  };

  const handleAgeChange = (text) => {
    // Only update age if the text is a valid number
    if (/^\d+$/.test(text) || text === "") {
      setUserAge(text === "" ? "" : parseInt(text));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Personal Details</Text>

      {/* Name */}
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Name"
        value={userName}
        onChangeText={(text) => setUserName(text)}
      />

      {/* Age */}
      <Text style={styles.label}>Age</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Age"
        keyboardType="numeric"
        value={userAge === 0 ? "" : userAge.toString()}  // Convert number to string if not empty
        onChangeText={handleAgeChange}  // Use the new handler for age
      />

      {/* Gender */}
      <Text style={styles.label}>Gender</Text>
      <View style={styles.radioButtonGroup}>
        <TouchableOpacity 
          style={[styles.radioButton, userGender === "Male" && styles.selectedRadio]} 
          onPress={() => setUserGender("Male")}>
          <Text style={styles.radioText}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.radioButton, userGender === "Female" && styles.selectedRadio]} 
          onPress={() => setUserGender("Female")}>
          <Text style={styles.radioText}>Female</Text>
        </TouchableOpacity>
      </View>

      {/* Address */}
      <Text style={styles.label}>Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Address"
        value={userAddress}
        onChangeText={(text) => setUserAddress(text)}
      />

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: "#000",
    paddingTop: StatusBar.currentHeight || 20,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 20,
  },
  label: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "500",
  },
  input: {
    color: "#fff",
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  radioButtonGroup: {
    flexDirection: "row",
    marginBottom: 20,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  selectedRadio: {
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 50,
    padding: 5,
  },
  radioText: {
    color: "#fff",
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: 'transparent',
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 20,
    borderColor: '#fff',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    textAlign: 'center',
  },
});
