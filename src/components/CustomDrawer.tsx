import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";

export default function CustomDrawer(props: any) {
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

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton}>
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