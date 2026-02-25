import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { getAuth, signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

export default function CustomDrawer(props: any) {
  const navigation: any = useNavigation();
  const auth = getAuth();

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await signOut(auth);
          navigation.replace("Login");
        },
      },
    ]);
  };

  return (
    <DrawerContentScrollView {...props}>
      {/* Drawer Header */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/hero.jpg")}
          style={styles.logo}
        />
        <Text style={styles.title}>Inqothovu</Text>
        <Text style={styles.subtitle}>Smelling Good</Text>
      </View>

      {/* Drawer Items */}
      <DrawerItemList {...props} />

      {/* Logout */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#d41ed3",
    padding: 20,
    marginBottom: 10,
  },
  logo: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#1df4f7",
  },
  logoutButton: {
    marginTop: 20,
    padding: 15,
  },
  logoutText: {
    color: "red",
    fontWeight: "bold",
  },
});