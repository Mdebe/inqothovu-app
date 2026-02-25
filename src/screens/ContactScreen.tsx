import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from "react-native";
import AppBar from "../components/AppBar";
import { useNavigation } from "@react-navigation/native";

export default function ContactScreen() {
  const navigation: any = useNavigation();

  const openWhatsApp = () => {
    Linking.openURL("https://wa.me/27664449653");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <AppBar title="Contact Us" onMenuPress={() => navigation.openDrawer()} />

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Get in Touch</Text>

        <Text style={styles.text}>📍 Richards Bay</Text>
        <Text style={styles.text}>📞 066 444 9653</Text>
        <Text style={styles.text}>✉️ info@inqothovu.co.za</Text>

        <TouchableOpacity style={styles.button} onPress={openWhatsApp}>
          <Text style={styles.buttonText}>Chat on WhatsApp</Text>
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
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#25D366",
    padding: 14,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
  },
});