import React from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";

export default function VolunteerProfile() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Volunteer Profile</Text>
      <Text style={styles.label}>Username: <Text style={styles.value}>itsy</Text></Text>
      <Text style={styles.label}>Email Address: <Text style={styles.value}>harshinivk12@gmail.com</Text></Text>
      <Text style={styles.label}>Phone Number: <Text style={styles.value}>+91 9901562607</Text></Text>
      <Text style={styles.label}>Age: <Text style={styles.value}>20</Text></Text>
      <Text style={styles.label}>Gender: <Text style={styles.value}>Female</Text></Text>
      <Text style={styles.label}>
        Govt. ID: <Text style={styles.value}>XXXXXXXXXXXX1234</Text> 
        <Text style={styles.idType}> Aadhar Card</Text>
      </Text>
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
  idType: {
    fontWeight: "normal",
    fontStyle: "italic",
    color: "#aaa",
  },
});
