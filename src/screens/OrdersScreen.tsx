import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import AppBar from "../components/AppBar";
import { useNavigation } from "@react-navigation/native";
import { getAuth, User } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase";

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  createdAt: any; // Firestore Timestamp
}

export default function OrdersScreen() {
  const navigation: any = useNavigation();
  const auth = getAuth();
  const currentUser: User | null = auth.currentUser;

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // Format ZAR
  const formatRands = (amount: number) =>
    new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
    }).format(amount);

  useEffect(() => {
    if (!currentUser) {
      Alert.alert("Not logged in", "Please login to view your orders.");
      navigation.replace("Login");
      return;
    }

    const fetchOrders = async () => {
      setLoading(true);
      try {
        const ordersRef = collection(db, "orders");
        const q = query(ordersRef, where("userId", "==", currentUser.uid));
        const querySnapshot = await getDocs(q);

        const fetchedOrders: Order[] = querySnapshot.docs.map((doc) => {
          const data = doc.data() as Omit<Order, "id">;
          return {
            id: doc.id,
            items: data.items || [],
            total: data.total || 0,
            createdAt: data.createdAt,
          };
        });

        setOrders(fetchedOrders);
      } catch (err: any) {
        console.error("Fetch orders error:", err);
        Alert.alert(
          "Error",
          err.message ||
            "Unable to fetch orders. Check your Firebase rules and internet connection."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentUser]);

  const renderOrder = ({ item }: { item: Order }) => (
    <View style={styles.orderCard}>
      <Text style={styles.orderId}>Order ID: {item.id}</Text>
      <Text style={styles.date}>
        Date:{" "}
        {item.createdAt?.toDate
          ? item.createdAt.toDate().toLocaleString()
          : "Unknown"}
      </Text>
      <Text style={styles.itemsTitle}>Items:</Text>
      {item.items.map((i, idx) => (
        <Text key={idx}>
          {i.name} - {i.quantity} x {formatRands(i.price)} ={" "}
          {formatRands(i.quantity * i.price)}
        </Text>
      ))}
      <Text style={styles.totalText}>Total: {formatRands(item.total)}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <AppBar title="My Orders" onMenuPress={() => navigation.openDrawer()} />

      <View style={{ flex: 1, padding: 20 }}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#d41ed3"
            style={{ marginTop: 50 }}
          />
        ) : orders.length === 0 ? (
          <Text>No previous orders.</Text>
        ) : (
          <FlatList
            data={orders}
            keyExtractor={(item) => item.id}
            renderItem={renderOrder}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  orderCard: {
    backgroundColor: "#f4f4f4",
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  orderId: {
    fontWeight: "bold",
    marginBottom: 4,
    color: "#d41ed3",
  },
  date: {
    marginBottom: 8,
    color: "#555",
  },
  itemsTitle: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  totalText: {
    fontWeight: "bold",
    marginTop: 6,
    color: "#010a33",
  },
});