import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      
      <Image
        source={require("../../assets/images/hero.jpg")}
        style={styles.avatar}
      />

      <Text style={styles.name}>Inqothovu Customer</Text>
      <Text style={styles.email}>customer@email.com</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>My Orders</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: "#ff4d4d" }]}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 50,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#d41ed3",
  },
  email: {
    color: "#a0a9a6",
    marginBottom: 30,
  },
  button: {
    width: "80%",
    backgroundColor: "#d41ed3",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});