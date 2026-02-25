import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

export default function SplashScreen() {
  const navigation: any = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Login"); // navigate to Login after 2.5s
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/logo.png")} // your logo
        style={styles.logo}
      />
      <Text style={styles.title}>Inqothovu</Text>
      <Text style={styles.subtitle}>Premium Fragrances & Diffusers</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
    backgroundColor: "#d41ed3",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
  },
});