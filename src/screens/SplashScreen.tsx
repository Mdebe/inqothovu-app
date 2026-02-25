import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";

export default function SplashScreen() {
  const navigation: any = useNavigation();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) {
      if (user) {
        navigation.replace("HomeDrawer");
      } else {
        navigation.replace("Login");
      }
    }
  }, [user, loading]);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Inqothovu</Text>
      <Text style={styles.subtitle}>Luxury Fragrances</Text>
      <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d41ed3",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: { fontSize: 34, fontWeight: "bold", color: "#fff" },
  subtitle: { color: "#fff", marginTop: 10, fontSize: 16 },
});