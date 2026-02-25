import React from "react";
import { View, Text } from "react-native";
import AppBar from "../components/AppBar";
import { useNavigation } from "@react-navigation/native";

export default function OrdersScreen() {
  const navigation: any = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <AppBar title="My Orders" onMenuPress={() => navigation.openDrawer()} />
      <View style={{ padding: 20 }}>
        <Text>No previous orders.</Text>
      </View>
    </View>
  );
}