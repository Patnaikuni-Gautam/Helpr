import React from "react";
import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Profile from '../assets/me.jpg';
import { useNavigation } from "@react-navigation/native";

export default function VolunteerProfile({navigation}) {

    const handleDecline = () => {
        alert("Request Declined");
        navigation.navigate('Home');
    };

    const handleAccept = () => {
        alert("Request Accepted");
        navigation.navigate('HelpAccepted');
    };

    return (
        <View style={styles.container}>
            {/* Header Section */}
            <TouchableOpacity style={styles.header} onPress={() => navigation.navigate('Settings')}>
                <Image
                    source={Profile} // Replace with the user's profile image URL
                    style={styles.profile}
                />
                <View style={styles.headerTextContainer}>
                    <Text style={styles.userName}>Harshini</Text>
                    <Text style={styles.userLocation}>Current location</Text>
                </View>
            </TouchableOpacity>

            <Text style={styles.title}>Target</Text>

            {/* Main Content */}
            <View style={styles.mainContent}>
                <Text style={styles.description}>Your target is xx m away from you</Text>
            </View>

            {/* Buttons */}
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
        backgroundColor: "#000",
        padding: 25,
        paddingBottom: 10,
        paddingTop: StatusBar.currentHeight || 20,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    headerTextContainer: {
        marginLeft: 10,
    },
    userName: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    userLocation: {
        color: "#aaa",
        fontSize: 14,
    },
    mainContent: {
        flex: 1, // Takes remaining space
        justifyContent: "center", // Vertically centers the content
        alignItems: "center", // Horizontally centers the content
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 10,
    },
    description: {
        fontSize: 18,
        color: "#fff",
        textAlign: "center",
    },
    buttonContainer: {
        marginTop: "auto",
        marginBottom: 40,
    },
    declineButton: {
        backgroundColor: "#FF5C5C",
        paddingVertical: 15,
        alignItems: "center",
        marginBottom: 20,
    },
    acceptButton: {
        backgroundColor: "#5CFF5C",
        paddingVertical: 15,
        alignItems: "center",
    },
    buttonText: {
        color: "#000",
        fontSize: 18,
        fontWeight: 'bold',
    },
    profile: {
        width: 48,
        height: 48,
        borderRadius: 50,
    },
});
