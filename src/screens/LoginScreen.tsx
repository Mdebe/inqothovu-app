import React, { useState } from "react"; 
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const navigation: any = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Login to your account</Text>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.replace("HomeDrawer")} // Navigate to drawer after login
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {/* Updated Sign Up navigation */}
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#d41ed3",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 32,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#f2f2f2",
    padding: 14,
    borderRadius: 14,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#d41ed3",
    padding: 16,
    borderRadius: 24,
    marginTop: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  linkText: {
    textAlign: "center",
    color: "#d41ed3",
    fontWeight: "bold",
    fontSize: 16,
  },
});