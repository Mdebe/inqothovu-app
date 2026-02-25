import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase"; // your Firestore config

export default function ProfileScreen() {
  const navigation: any = useNavigation();
  const auth = getAuth();
  const currentUser = auth.currentUser;

  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      const userRef = doc(db, "users", currentUser.uid);
      getDoc(userRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          }
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          signOut(auth)
            .then(() => navigation.replace("Login"))
            .catch((err) => Alert.alert("Error", err.message));
        },
      },
    ]);
  };

  if (loading) return <Text style={styles.loadingText}>Loading profile...</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Avatar */}
      <Image
        source={require("../../assets/images/hero.jpg")}
        style={styles.avatar}
      />

      {/* User Info */}
      <Text style={styles.name}>{userData?.name || currentUser?.displayName || "User Name"}</Text>
      <Text style={styles.email}>{userData?.email || currentUser?.email}</Text>

      {/* User Details Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Details</Text>
        <Text style={styles.detailText}>Phone: {userData?.phone || "Not provided"}</Text>
        <Text style={styles.detailText}>Address: {userData?.address || "Not provided"}</Text>
      </View>

      {/* Orders */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Orders")}>
        <Text style={styles.buttonText}>My Orders</Text>
      </TouchableOpacity>

      {/* Settings */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Settings")}>
        <Text style={styles.buttonText}>Settings</Text>
      </TouchableOpacity>

      {/* Logout */}
      <TouchableOpacity style={[styles.button, { backgroundColor: "#ff4d4d" }]} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  loadingText: {
    marginTop: 100,
    fontSize: 18,
    color: "#555",
    textAlign: "center",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#d41ed3",
  },
  email: {
    color: "#6c6c6c",
    marginBottom: 30,
  },
  section: {
    width: "100%",
    backgroundColor: "#f7f7f7",
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#d41ed3",
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 6,
  },
  button: {
    width: "100%",
    backgroundColor: "#d41ed3",
    padding: 16,
    borderRadius: 16,
    marginBottom: 15,
    alignItems: "center",
    shadowColor: "#d41ed3",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});