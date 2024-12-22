import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EmergencyContacts() {
  const [contacts, setContacts] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  // Load contacts from AsyncStorage when the component mounts
  useEffect(() => {
    const loadContacts = async () => {
      try {
        const savedContacts = await AsyncStorage.getItem("contacts");
        if (savedContacts) {
          setContacts(JSON.parse(savedContacts));
        }
      } catch (error) {
        console.error("Failed to load contacts", error);
      }
    };

    loadContacts();
  }, []);

  // Save contacts to AsyncStorage whenever the contacts array changes
  useEffect(() => {
    const saveContacts = async () => {
      try {
        await AsyncStorage.setItem("contacts", JSON.stringify(contacts));
      } catch (error) {
        console.error("Failed to save contacts", error);
      }
    };

    saveContacts();
  }, [contacts]);

  const addContact = () => {
    if (newName.trim() && newPhone.trim()) {
      const newContact = {
        id: Date.now().toString(),
        name: newName,
        phone: newPhone,
      };
      setContacts([...contacts, newContact]);
      setNewName("");
      setNewPhone("");
    } else {
      Alert.alert("Invalid Input", "Please enter both name and phone number");
    }
  };

  const renderContact = ({ item }) => (
    <View style={styles.contactContainer}>
      <Text style={styles.label}>
        Name: <Text style={styles.value}>{item.name}</Text>
      </Text>
      <Text style={styles.label}>
        Phone Number: <Text style={styles.value}>{item.phone}</Text>
      </Text>
      <View style={styles.separator} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Emergency Contacts</Text>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={renderContact}
        contentContainerStyle={contacts.length === 0 && styles.emptyListContainer}
        ListEmptyComponent={<Text style={styles.noContactsText}>No contacts added yet.</Text>}
      />
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          placeholderTextColor="#888"
          value={newName}
          onChangeText={setNewName}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Phone Number"
          placeholderTextColor="#888"
          value={newPhone}
          onChangeText={setNewPhone}
          keyboardType="phone-pad"
        />
        <TouchableOpacity style={styles.addButton} onPress={addContact}>
          <Text style={styles.addButtonText}>Add Contact</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: StatusBar.currentHeight || 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  noContactsText: {
    fontSize: 16,
    color: "#aaa",
    textAlign: "center",
    marginTop: 20,
  },
  contactContainer: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  value: {
    fontWeight: "normal",
    color: "#eee",
  },
  separator: {
    height: 1,
    backgroundColor: "#444",
    marginVertical: 10,
  },
  formContainer: {
    padding: 20,
  },
  input: {
    color: '#fff',
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: "transparent",
    borderColor: "#fff",
    borderWidth: 1,
    paddingVertical: 20,
    alignItems: "center",
    marginTop: 20,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  emptyListContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
});
