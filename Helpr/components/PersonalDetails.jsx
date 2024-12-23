import React, { useEffect, useState } from "react";
import Profile from '../assets/me.jpg';
import { StyleSheet, View, Text, Image, TouchableOpacity, StatusBar } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { useNavigation, useFocusEffect } from "@react-navigation/native"; // For navigating to the edit screen and refocusing
import { getAuth } from "firebase/auth"; // Firebase authentication import

export default function PersonalDetails() {
  const navigation = useNavigation();
  const [userEmail, setUserEmail] = useState(""); // State to hold user's email
  const [userName, setUserName] = useState("Not set"); // You can fetch this from Firebase or use static data
  const [userPhone, setUserPhone] = useState("unset"); // Replace with real phone number when available
  const [userAge, setUserAge] = useState(21); // Replace with real data
  const [userGender, setUserGender] = useState("unset"); // Replace with real data
  const [userAddress, setUserAddress] = useState("Not available"); // Replace with real address
  // const [userGovtID, setUserGovtID] = useState("xxxxxxx"); // Replace with real Govt ID

  // Fetch user details from AsyncStorage when screen gains focus
  useFocusEffect(
    React.useCallback(() => {
      const loadUserData = async () => {
        try {
          const storedUserName = await AsyncStorage.getItem('userName');
          const storedUserEmail = await AsyncStorage.getItem('userEmail');
          const storedUserPhone = await AsyncStorage.getItem('userPhone');
          const storedUserAge = await AsyncStorage.getItem('userAge');
          const storedUserGender = await AsyncStorage.getItem('userGender');
          const storedUserAddress = await AsyncStorage.getItem('userAddress');
          const storedUserGovtID = await AsyncStorage.getItem('userGovtID');

          if (storedUserName) setUserName(storedUserName);
          if (storedUserEmail) setUserEmail(storedUserEmail);
          if (storedUserPhone) setUserPhone(storedUserPhone);
          if (storedUserAge) setUserAge(parseInt(storedUserAge));
          if (storedUserGender) setUserGender(storedUserGender);
          if (storedUserAddress) setUserAddress(storedUserAddress);
          if (storedUserGovtID) setUserGovtID(storedUserGovtID);
        } catch (error) {
          console.error('Error loading user data', error);
        }
      };

      loadUserData();
      // Fetch user details from Firebase
      const fetchUserFromFirebase = async () => {
        const auth = getAuth();
        const user = auth.currentUser; // Get the currently authenticated user
        if (user) {
          setUserEmail(user.email); // Set email from Firebase
          setUserPhone(user.phoneNumber || 'Not available'); // Set phone number (if available)
        }
      };

      fetchUserFromFirebase();
    }, [])
  );

  const navigateToEdit = () => {
    navigation.navigate("EditPersonalDetails"); // Replace with your actual edit screen route
  };

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <Image
          source={Profile}
          style={styles.profileImage}
        />
      </View>
      <View style={styles.alignCenter}>
        <Text style={styles.name}>{userName}</Text>
        <Text style={styles.email}>{userEmail || "Email not available"}</Text>
      </View>
      <View style={styles.placeTop}>
        <Text style={styles.textStyle}>Name: <Text style={styles.lighterText}>{userName}</Text></Text>
        <Text style={styles.textStyle}>Email Address: <Text style={styles.lighterText}>{userEmail || "Not available"}</Text></Text>
        <Text style={styles.textStyle}>Phone Number: <Text style={styles.lighterText}>{userPhone}</Text></Text>
        <Text style={styles.textStyle}>Age: <Text style={styles.lighterText}>{userAge}</Text></Text>
        <Text style={styles.textStyle}>Gender: <Text style={styles.lighterText}>{userGender}</Text></Text>
        <Text style={styles.textStyle}>Address: <Text style={styles.lighterText}>{userAddress}</Text></Text>
        {/* <View style={styles.govID}>
            <Text style={styles.textStyle}>Govt. ID: <Text style={styles.lighterText}>{userGovtID}</Text></Text>
            <Text style={styles.gov}>Aadhar Card</Text>
        </View> */}
      </View>

      {/* Edit Button */}
      <TouchableOpacity style={styles.editButton} onPress={navigateToEdit}>
        <Text style={styles.editButtonText}>Edit Details</Text>
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
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  profileImage: {
    width: 128,
    height: 128,
    borderRadius: 100,
  },
  name: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "600",
  },
  email: {
    color: "#ccc",
    fontSize: 14,
  },
  alignCenter: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  textStyle: {
    color: "#ccc",
    fontSize: 16,
    marginBottom: 14,
    fontWeight: 500,
  },
  lighterText: {
    fontWeight: 400,
    fontSize: 14,
  },
  placeTop: {
    marginTop: 20,
  },
  govID: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gov: {
    color: '#bbb',
    fontSize: 14,
    fontWeight: '400',
  },
  editButton: {
    backgroundColor: 'transparent',
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 20,
    borderColor: '#fff',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto 0',
    width: '100%',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  }
});
