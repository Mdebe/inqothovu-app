// src/screens/MessagesScreen.tsx
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs, query, orderBy } from "firebase/firestore";
import { auth, db } from "../config/firebase";

interface Message {
  id: string;
  text: string;
  sender: string;
  createdAt: Date;
}

// Mock messages fallback
const MOCK_MESSAGES: Message[] = [
  { id: "1", text: "Hello! This is a mock message.", sender: "System", createdAt: new Date() },
  { id: "2", text: "Another mock message.", sender: "System", createdAt: new Date() },
];

export default function MessagesScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
 

  useEffect(() => {
    const fetchMessages = async () => {
      if (!auth.currentUser) {
        console.log("User not signed in, using mock messages.");
        setMessages(MOCK_MESSAGES);
        setLoading(false);
        return;
      }

      try {
        const messagesRef = collection(db, "messages"); // your collection name
        const q = query(messagesRef, orderBy("createdAt", "asc"));
        const snapshot = await getDocs(q);

        const fetchedMessages: Message[] = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            text: data.text || "",
            sender: data.sender || "Unknown",
            createdAt: data.createdAt?.toDate() || new Date(),
          };
        });

        setMessages(fetchedMessages);
      } catch (error) {
        console.error("Firestore fetch failed, using mock messages:", error);
        setMessages(MOCK_MESSAGES);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#333" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.message}>
            <Text style={styles.sender}>{item.sender}:</Text>
            <Text style={styles.text}>{item.text}</Text>
            <Text style={styles.time}>{item.createdAt.toLocaleTimeString()}</Text>
          </View>
        )}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f2" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  message: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sender: { fontWeight: "bold", marginBottom: 4 },
  text: { fontSize: 16 },
  time: { fontSize: 12, color: "#888", marginTop: 4 },
});