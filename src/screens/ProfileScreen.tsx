import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signOut, updateProfile, User } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import AppBar from "../components/AppBar";
import BottomNav from "../navigation/BottomTabs"; // <- import your custom BottomNav

export default function ProfileScreen() {
  const navigation: any = useNavigation();
  const auth = getAuth();
  const currentUser: User | null = auth.currentUser;

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      navigation.replace("Login");
      return;
    }

    const loadData = async () => {
      setLoading(true);
      const userRef = doc(db, "users", currentUser.uid);
      try {
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data() as any);
        } else {
          setUserData({
            name: currentUser.displayName || "",
            email: currentUser.email || "",
            phone: "",
            address: "",
          });
        }
      } catch (err: any) {
        Alert.alert("Error", err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
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

  const handleSave = async () => {
    if (!currentUser) return;

    if (!userData.name || !userData.email) {
      Alert.alert("Missing Fields", "Name and Email are required.");
      return;
    }

    setSaving(true);
    const userRef = doc(db, "users", currentUser.uid);

    try {
      await setDoc(userRef, userData, { merge: true });

      if (currentUser.displayName !== userData.name) {
        await updateProfile(currentUser, { displayName: userData.name });
      }

      Alert.alert("Success", "Profile updated successfully.");
      setEditing(false);
    } catch (err: any) {
      Alert.alert("Error", err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#d41ed3" style={{ marginTop: 100 }} />;
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* Top AppBar */}
      <AppBar title="Profile" onMenuPress={() => navigation.openDrawer()} />

      <ScrollView contentContainerStyle={styles.container}>
        {/* Avatar */}
        <Image
          source={require("../../assets/images/hero.jpg")}
          style={styles.avatar}
        />

        {/* Editable Fields */}
        <TextInput
          style={[styles.input, !editing && styles.disabledInput]}
          value={userData.name}
          onChangeText={(text) => setUserData({ ...userData, name: text })}
          placeholder="Full Name"
          placeholderTextColor="#888"
          editable={editing}
        />
        <TextInput
          style={[styles.input, !editing && styles.disabledInput]}
          value={userData.email}
          onChangeText={(text) => setUserData({ ...userData, email: text })}
          placeholder="Email"
          placeholderTextColor="#888"
          keyboardType="email-address"
          editable={editing}
        />
        <TextInput
          style={[styles.input, !editing && styles.disabledInput]}
          value={userData.phone}
          onChangeText={(text) => setUserData({ ...userData, phone: text })}
          placeholder="Phone Number"
          placeholderTextColor="#888"
          keyboardType="phone-pad"
          editable={editing}
        />
        <TextInput
          style={[styles.input, !editing && styles.disabledInput]}
          value={userData.address}
          onChangeText={(text) => setUserData({ ...userData, address: text })}
          placeholder="Address"
          placeholderTextColor="#888"
          editable={editing}
        />

        {/* Buttons */}
        {editing ? (
          <TouchableOpacity
            style={styles.button}
            onPress={handleSave}
            disabled={saving}
          >
            {saving ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Save Profile</Text>}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={() => setEditing(true)}
          >
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
        )}
        {/* Notifications Card */}
<TouchableOpacity
  style={styles.notificationCard}
  onPress={() => navigation.navigate("Messages")}
>
  <Text style={styles.notificationTitle}>Messages / Notifications</Text>
  <Text style={styles.notificationCount}>{/* You can show unread count */}</Text>
</TouchableOpacity>

        {/* Logout */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#ff4d4d" }]}
          onPress={handleLogout}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Use your custom BottomNav */}
       
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingBottom: 80, // leave space for bottom nav
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  input: {
    width: "100%",
    backgroundColor: "#f4f4f4",
    padding: 14,
    borderRadius: 16,
    marginBottom: 16,
    fontSize: 16,
    color: "#000",
  },
  disabledInput: {
    backgroundColor: "#e0e0e0",
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
  notificationCard: {
  width: "100%",
  backgroundColor: "#f4f4f4",
  padding: 16,
  borderRadius: 16,
  marginVertical: 10,
},
notificationTitle: {
  fontSize: 16,
  fontWeight: "bold",
  color: "#d41ed3",
},
notificationCount: {
  fontSize: 14,
  color: "#555",
  marginTop: 4,
},

});