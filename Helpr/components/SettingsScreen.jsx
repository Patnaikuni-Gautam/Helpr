import React from "react";
import Profile from '../assets/me.jpg';
import { StyleSheet, View, Text, Image, TouchableOpacity, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function SettingsScreen() {

  const navigation = useNavigation();

  const navigateTo = (option) => {
    let formattedTitle = option.replace(/\s+/g, '');
    navigation.navigate(formattedTitle);
  }

    const navigateToPersonal = () => {
      navigation.navigate("PersonalDetails");
    }

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <TouchableOpacity style={styles.profileContainer} onPress={navigateToPersonal}>
        <Image
          source={Profile}
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.name}>Harshini</Text>
          <Text style={styles.email}>Email address</Text>
        </View>
      </TouchableOpacity>

      {/* Settings Options */}
      <View style={styles.optionsContainer}>
        {[
          "Personal Details",
          "Volunteer Details",
          "Emergency Contact Details",
          "Payments and Subscription",
          "Parental Controls",
          "Privacy and Policy",
        ].map((option, index) => (
          <TouchableOpacity key={index} style={styles.option} onPress={() => navigateTo(option)}>
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Log out Button */}
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignSelf: "stretch",
    backgroundColor: "#000",
    padding: 25,
    paddingBottom: 10,
    paddingTop: StatusBar.currentHeight || 20,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  name: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  email: {
    color: "#ccc",
    fontSize: 14,
  },
  optionsContainer: {
    flex: 1,
    marginBottom: 20,
  },
  option: {
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    paddingVertical: 15,
  },
  optionText: {
    color: "#fff",
    fontSize: 16,
    padding: 5,
    paddingLeft: 0,
    paddingRight: 0
  },
  logoutButton: {
    padding: 15,
    marginBottom: 25,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#fff",
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});
