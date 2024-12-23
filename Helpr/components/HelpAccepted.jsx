import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import Profile from "../assets/me.jpg";
import MapView, { Marker, Circle } from "react-native-maps";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import { fetchZonesFromFirestore } from "../Backend/ZoneService"; // Fetch zones dynamically
import { mergeOverlappingZones } from "../Backend/ZoneMergeMangement"; // Merge overlapping zones

export default function HelpAccepted() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [region, setRegion] = useState(null);
  const [zones, setZones] = useState([]);
  const [mapInitialized, setMapInitialized] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      try {
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
        const fetchedZones = await fetchZonesFromFirestore();
        console.log("Fetched zones:", fetchedZones);
        setZones(fetchedZones);
      } catch (error) {
        console.error("Error initializing location or fetching zones:", error);
      }
    })();
  }, []);

  const handleLongPress = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
  };

  const handleUnselect = () => {
    setSelectedLocation(null);
  };

  const handleButtonPress = () => {
    Alert.alert("Way to go, savior!", "Redirecting to Home...", [
      {
        text: "OK",
        onPress: () => navigation.navigate("Home"),
      },
    ]);
  };

  const mergedZones = mergeOverlappingZones(zones);

  const navigateToSettings = () => navigation.navigate("Settings");

  if (!location) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {errorMsg ? errorMsg : "Waiting for location..."}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.nav}>
        <TouchableOpacity
          style={styles.profileContainer}
          onPress={navigateToSettings}
        >
          <Image source={Profile} style={styles.profile} />
          <View>
            <Text style={styles.name}>Harshini</Text>
            <Text style={styles.location}>Current Location</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Map Section */}
      <View style={styles.map}>
        <MapView
          style={styles.mapInside}
          initialRegion={
            region || {
              latitude: 37.78825, // Default fallback latitude
              longitude: -122.4324, // Default fallback longitude
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }
          }
          showsUserLocation={true}
          followsUserLocation={false}
          onLongPress={handleLongPress}
          onPress={handleUnselect}
        >
          {region && (
            <Marker
              coordinate={{
                latitude: region.latitude,
                longitude: region.longitude,
              }}
              title="You are here"
            />
          )}
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
              fillColor={
                zone.type === "danger"
                  ? "rgba(255, 0, 0, 0.3)"
                  : "rgba(0, 255, 0, 0.3)"
              }
            />
          ))}
          {selectedLocation && (
            <Marker
              coordinate={selectedLocation}
              title="Selected Location"
              onPress={handleUnselect}
            />
          )}
        </MapView>
      </View>

      <Text style={styles.live}>Live location shared</Text>

      {/* Details Section */}
      <View style={styles.detailsContainer}>
        <Text style={styles.detailText}>
          <Text style={styles.detailLabel}>Name:</Text> Harshini
        </Text>
        <Text style={styles.detailText}>
          <Text style={styles.detailLabel}>Age:</Text> 21
        </Text>
        <Text style={styles.detailText}>
          <Text style={styles.detailLabel}>Gender:</Text> Female
        </Text>
        <Text style={styles.detailText}>
          <Text style={styles.detailLabel}>Phone Number:</Text> 9901562607
        </Text>
      </View>

      {/* Button Section */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
          <Text style={styles.buttonText}>Successfully Helped</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
    paddingTop: StatusBar.currentHeight || 25,
  },
  nav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profile: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  name: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  location: {
    color: "#aaa",
    fontSize: 12,
    marginLeft: 10,
  },
  map: {
    width: "100%",
    height: "25%",
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 20,
    backgroundColor: "#ccc", // Add this for debugging
  },
  mapInside: {
    width: "100%",
    height: "100%",
  },
  detailsContainer: {
    marginTop: 20,
  },
  detailText: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 10,
  },
  detailLabel: {
    fontWeight: "bold",
  },
  text: {
    color: "#fff",
    fontSize: 16,
  },
  live: {
    width: "100%",
    textAlign: "right",
    color: "#c5c5c5",
    marginBottom: 20,
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  button: {
    padding: 20,
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "transparent",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
