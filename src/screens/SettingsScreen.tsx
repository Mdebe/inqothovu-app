import React from "react";
import {
  View,
  Text,
  Switch,
  StyleSheet,
} from "react-native";
import AppBar from "../components/AppBar";
import { useNavigation } from "@react-navigation/native";

export default function SettingsScreen() {
  const navigation: any = useNavigation();
  const [darkMode, setDarkMode] = React.useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <AppBar title="Settings" onMenuPress={() => navigation.openDrawer()} />

      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.label}>Dark Mode</Text>
          <Switch value={darkMode} onValueChange={setDarkMode} />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Notifications</Text>
          <Switch value={true} />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>App Version</Text>
          <Text>1.0.0</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
  },
});