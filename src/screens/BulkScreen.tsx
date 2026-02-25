import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import AppBar from "../components/AppBar";
import { useNavigation } from "@react-navigation/native";

export default function BulkScreen() {
  const navigation: any = useNavigation();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = () => {
    Alert.alert("Bulk Order Sent", "We will contact you soon!");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <AppBar title="Bulk Orders" onMenuPress={() => navigation.openDrawer()} />

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Order in Bulk</Text>

        <TextInput
          placeholder="Your Name"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        <TextInput
          placeholder="Phone Number"
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        <TextInput
          placeholder="Quantity Needed"
          style={styles.input}
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit Bulk Request</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#d41ed3",
  },
  input: {
    backgroundColor: "#f2f2f2",
    padding: 14,
    borderRadius: 12,
    marginBottom: 14,
  },
  button: {
    backgroundColor: "#d41ed3",
    padding: 14,
    borderRadius: 25,
    marginTop: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
  },
});