import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  title: string;
  onMenuPress: () => void;
}

export default function AppBar({ title, onMenuPress }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onMenuPress}>
        <Ionicons name="menu" size={28} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity>
        <Ionicons name="person-outline" size={26} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    backgroundColor: "#d41ed3",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});