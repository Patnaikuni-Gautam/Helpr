import React, { useState, useEffect } from "react";
import { StatusBar, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function VolunteerDetails() {
  const [userName, setUserName] = useState(null);
  const [userAge, setUserAge] = useState(null);
  const [userGender, setUserGender] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Fetch volunteer details when the screen is focused
      const fetchDetails = async () => {
        const storedName = await AsyncStorage.getItem("volunteerName");
        const storedAge = await AsyncStorage.getItem("userAge");
        const storedGender = await AsyncStorage.getItem("userGender");

        if (storedName) setUserName(storedName);
        if (storedAge) setUserAge(storedAge);
        if (storedGender) setUserGender(storedGender);
      };
      fetchDetails();
    });

    // Cleanup the listener on unmount
    return unsubscribe;
  }, [navigation]);

  const navigateToEdit = () => {
    navigation.navigate("EditVolunteerDetails");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Volunteer Profile</Text>
      <Text style={styles.label}>Username: <Text style={styles.value}>{userName || "Not available"}</Text></Text>
      <Text style={styles.label}>Email Address: <Text style={styles.value}>harshinivk12@gmail.com</Text></Text>
      <Text style={styles.label}>Phone Number: <Text style={styles.value}>+91 9901562607</Text></Text>
      <Text style={styles.label}>Age: <Text style={styles.value}>{userAge || "Not available"}</Text></Text>
      <Text style={styles.label}>Gender: <Text style={styles.value}>{userGender || "Not available"}</Text></Text>

      {/* Edit Button */}
      <TouchableOpacity style={styles.editButton} onPress={navigateToEdit}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
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
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 25,
  },
  value: {
    fontWeight: "normal",
    color: '#eee',
  },
  editButton: {
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});
