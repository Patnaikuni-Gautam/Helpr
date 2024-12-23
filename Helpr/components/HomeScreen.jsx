import { Image, StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import Profile from "../assets/me.jpg";
import Volunteer from "../assets/volunteer.png";
import React, { useState, useEffect } from "react";
import MapView, { Marker, Circle } from "react-native-maps";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import call from 'react-native-phone-call';
import { fetchZonesFromFirestore } from "../Backend/ZoneService"; // Import fetch function
import { mergeOverlappingZones } from '../Backend/ZoneMergeMangement'; // Import the merging function
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

export default function HomeScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [zones, setZones] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null); // Track selected location
  const [mapInitialized, setMapInitialized] = useState(false); // Track if the map region is set initially
  const [userName, setUserName] = useState("Harshini"); // Default to "Harshini"
  const [showCurrentLocationMarker, setShowCurrentLocationMarker] = useState(false); // Track marker visibility
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      // Watch user location but set region only once initially
      Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, distanceInterval: 1 },
        (loc) => {
          setLocation(loc);

          // Set the initial map region only once
          if (!mapInitialized) {
            setRegion({
              latitude: loc.coords.latitude,
              longitude: loc.coords.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            });
            setMapInitialized(true);
          }
        }
      );

      // Fetch zones from Firestore
      const fetchedZones = await fetchZonesFromFirestore(); // Fetch zones dynamically from Firestore
      setZones(fetchedZones);

      // Fetch userName from AsyncStorage and update the state
      const storedUserName = await AsyncStorage.getItem("userName");
      if (storedUserName) {
        setUserName(storedUserName); // Update userName if fetched
      }
    })();
  }, []); // Empty dependency array to run only once on component mount

  if (!location) {
    return (
      <View style={styles.container}>
        <Text>{errorMsg ? errorMsg : "Waiting for location..."}</Text>
      </View>
    );
  }

  const navigateToSettings = () => {
    setTimeout(() => {
      navigation.navigate("Settings");
    }, 0);
  };

  const phoneNumber = '9901562607';

  const makeEmergencyCall = async () => {
    try {
      Alert.alert(
        'Emergency Call',
        'Initiate emergency call immediately?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Call',
            onPress: () => {
              const args = { number: phoneNumber, prompt: false };
              call(args).catch((err) => {
                console.error('Call failed', err);
                Alert.alert('Call Failed', 'Unable to make emergency call. Please dial manually.');
              });
            },
            style: 'destructive',
          }
        ]
      );
    } catch (error) {
      console.error('Emergency call setup failed:', error);
      Alert.alert('Error', 'Could not initiate emergency call.');
    }
  };

  // Handle long press to select location
  const handleLongPress = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
  };

  // Handle tapping on the selected marker or map to unselect
  const handleUnselect = () => {
    setSelectedLocation(null); // Unselect the location
  };

  const navigateToReportZone = () => {
    navigation.navigate("ReportZone", { location: selectedLocation }); // Pass selected location
  };

  // Merge overlapping zones before displaying
  const mergedZones = mergeOverlappingZones(zones);

  // Handle volunteer icon click
  const handleVolunteerClick = async () => {
    const consentStatus = await AsyncStorage.getItem("isVolunteer");

    if (!consentStatus || JSON.parse(consentStatus) === false) {
      // If no consent or consent is false, redirect to consent form
      navigation.navigate("VolunteerConsent"); // Redirect to the consent form
    } else {
      // If consented, go to helper screen
      navigation.navigate("Helper"); // Redirect to helper screen
    }
  };

  const handlePressNearLocation = () => {
    // Show the marker near the location
    setShowCurrentLocationMarker(true);

    // Hide the marker after 1 second
    setTimeout(() => {
      setShowCurrentLocationMarker(false);
    }, 1000); // 1000 ms = 1 second
  };

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <TouchableOpacity style={styles.profileContainer} onPress={navigateToSettings}>
          <Image source={Profile} style={styles.profile} />
          <View>
            <Text style={styles.name}>{userName}</Text> {/* Use fetched userName */}
            <Text style={styles.location}>
              {location ? `Lat: ${location.coords.latitude.toFixed(4)}, Long: ${location.coords.longitude.toFixed(4)}` : "Current Location"}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileContainer} onPress={handleVolunteerClick}>
          <Image source={Volunteer} style={styles.volunteer} />
        </TouchableOpacity>
      </View>
      <View style={styles.map}>
        <MapView
          style={styles.mapInside}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          showsUserLocation={true}
          followsUserLocation={false} // Disable auto-follow to prevent reset
          rotateEnabled={true} // Allow rotation without resetting to North
          onPress={handlePressNearLocation} // Trigger marker visibility on press near location
          onLongPress={handleLongPress}
        >
          {/* Render "You are here" marker if visible */}
          {showCurrentLocationMarker && (
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="You are here"
            />
          )}

          {/* Render merged zones */}
          {mergedZones.map((zone, index) => (
            <Circle
              key={index}
              center={{
                latitude: zone.latitude,
                longitude: zone.longitude,
              }}
              radius={zone.radius}
              strokeWidth={2}
              strokeColor={zone.type === "danger" ? "red" : "green"}
              fillColor={zone.type === "danger" ? "rgba(255, 0, 0, 0.3)" : "rgba(0, 255, 0, 0.3)"}
            />
          ))}

          {/* Show selected location as a marker */}
          {selectedLocation && (
            <Marker
              coordinate={selectedLocation}
              title="Selected Location"
              onPress={handleUnselect} // Tap on selected marker to unselect
            />
          )}
        </MapView>
      </View>
      <TouchableOpacity style={styles.sosMain} onPress={makeEmergencyCall}>
        <Text style={[styles.sosText, styles.white]}>SOS</Text>
      </TouchableOpacity>

      {/* Show Report Zone button only when a location is selected */}
      {selectedLocation && (
        <TouchableOpacity style={styles.reportZoneButton} onPress={navigateToReportZone}>
          <Text style={styles.reportZoneText}>Report this Zone</Text>
        </TouchableOpacity>
      )}
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
  },
  white: {
    color: "#fff",
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  profile: {
    width: 48,
    height: 48,
    borderRadius: 50,
  },
  name: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 14,
  },
  location: {
    color: "#fff",
    opacity: 0.7,
    fontSize: 12,
  },
  profileContainer: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    flexWrap: "wrap",
  },
  map: {
    width: "100%",
    height: "75%",
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  mapInside: {
    width: "100%",
    height: "100%",
  },
  sosMain: {
    backgroundColor: "#C70039",
    padding: 12,
    borderRadius: 28,
  },
  sosText: {
    alignSelf: "center",
    fontSize: 24,
    fontWeight: "500",
    letterSpacing: 2,
  },
  volunteer: {
    width: 48,
    height: 48,
  },
  reportZoneButton: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 28,
    marginTop: 10,
  },
  reportZoneText: {
    alignSelf: "center",
    fontSize: 18,
    color: "#fff",
  },
});
